(function () {
  var cachedTokens = null;
  var cachedTokensPromise = null;
  var cachedFieldTypes = null;
  var cachedFieldTypesPromise = null;
  var observerStarted = false;
  var isApplyingRuntime = false;
  var INLINE_RICH_TAGS = {
    strong: true,
    em: true,
    a: true,
    br: true
  };
  var FULL_RICH_TAGS = {
    p: true,
    ul: true,
    ol: true,
    li: true,
    strong: true,
    em: true,
    a: true,
    br: true
  };
  var DROP_CONTENT_TAGS = {
    script: true,
    style: true,
    iframe: true,
    object: true,
    embed: true,
    template: true,
    noscript: true
  };

  function resolveToken(tokens, path) {
    return path.split(".").reduce(function (value, key) {
      return value && value[key] !== undefined ? value[key] : undefined;
    }, tokens);
  }

  function applyTokenBindings(root, tokens) {
    root.querySelectorAll("[data-token-text], [data-token-attr-href], [data-token-attr-title], [data-token-attr-src], [data-token-attr-alt], [data-token-attr-width], [data-token-attr-height]").forEach(function (node) {
      Array.from(node.attributes).forEach(function (attribute) {
        if (!attribute.name.startsWith("data-token-attr-")) {
          return;
        }

        var targetAttr = attribute.name.replace("data-token-attr-", "");
        var tokenValue = resolveToken(tokens, attribute.value);

        if (tokenValue !== undefined) {
          node.setAttribute(targetAttr, String(tokenValue));
        }
      });

      if (node.dataset.tokenText) {
        var textValue = resolveToken(tokens, node.dataset.tokenText);
        if (textValue !== undefined) {
          node.textContent = String(textValue);
        }
      }
    });
  }

  function buildFieldTypeMap(exportMap) {
    var fieldTypes = {};

    if (!exportMap || !Array.isArray(exportMap.modules)) {
      return fieldTypes;
    }

    exportMap.modules.forEach(function (moduleDefinition) {
      if (!moduleDefinition || !Array.isArray(moduleDefinition.fields)) {
        return;
      }

      moduleDefinition.fields.forEach(function (fieldDefinition) {
        if (!fieldDefinition || !fieldDefinition.name || !fieldDefinition.type) {
          return;
        }

        fieldTypes[fieldDefinition.name] = {
          type: fieldDefinition.type,
          allowedValues: Array.isArray(fieldDefinition.allowed_values) ? fieldDefinition.allowed_values.slice() : null
        };
      });
    });

    return fieldTypes;
  }

  function fetchTokens() {
    if (cachedTokensPromise) {
      return cachedTokensPromise;
    }

    cachedTokensPromise = fetch("../brand-map.json")
      .then(function (response) {
        return response.json().then(function (brandMap) {
          return {
            brandMap: brandMap,
            brandMapUrl: response.url
          };
        });
      })
      .then(function (payload) {
        var brandMap = payload.brandMap;
        var brandId = brandMap.default_brand;
        var tokenUrl = brandMap.brands && brandMap.brands[brandId] && brandMap.brands[brandId].design_tokens;

        if (!tokenUrl) {
          return null;
        }

        var resolvedTokenUrl = new URL(tokenUrl, payload.brandMapUrl).href;
        return fetch(resolvedTokenUrl).then(function (response) { return response.json(); });
      })
      .catch(function (error) {
        console.warn("preview token runtime failed", error);
        return null;
      });

    return cachedTokensPromise;
  }

  function fetchFieldTypes() {
    if (cachedFieldTypesPromise) {
      return cachedFieldTypesPromise;
    }

    cachedFieldTypesPromise = fetch(new URL("../../agent/export-map.json", window.location.href).href)
      .then(function (response) { return response.json(); })
      .then(buildFieldTypeMap)
      .catch(function (error) {
        console.warn("preview export map load failed", error);
        return null;
      });

    return cachedFieldTypesPromise;
  }

  function applyPreviewCssVars(tokens) {
    var cssVariables = tokens.email_preview && tokens.email_preview.css_variables;
    if (!cssVariables) {
      return;
    }

    var style = document.documentElement.style;
    Object.keys(cssVariables).forEach(function (name) {
      if (cssVariables[name] !== undefined) {
        style.setProperty(name, String(cssVariables[name]));
      }
    });
  }

  function isSafeHref(value) {
    var trimmedValue = String(value || "").trim();
    var normalizedValue = trimmedValue.toLowerCase();

    if (!trimmedValue) {
      return false;
    }

    return normalizedValue.indexOf("http://") === 0 ||
      normalizedValue.indexOf("https://") === 0 ||
      normalizedValue.indexOf("mailto:") === 0 ||
      normalizedValue.indexOf("tel:") === 0 ||
      trimmedValue.charAt(0) === "#" ||
      trimmedValue.charAt(0) === "/" ||
      trimmedValue.indexOf("./") === 0 ||
      trimmedValue.indexOf("../") === 0 ||
      trimmedValue.charAt(0) === "?";
  }

  function copyRichAttribute(sourceNode, targetNode, attributeName) {
    var attributeValue = sourceNode.getAttribute(attributeName);

    if (attributeValue !== null) {
      targetNode.setAttribute(attributeName, attributeValue);
    }
  }

  function copySafeRichAttributes(sourceNode, targetNode, tagName) {
    if (sourceNode.hasAttribute("class")) {
      copyRichAttribute(sourceNode, targetNode, "class");
    }

    if (sourceNode.hasAttribute("data-export-role")) {
      copyRichAttribute(sourceNode, targetNode, "data-export-role");
    }

    if (sourceNode.hasAttribute("data-export-index")) {
      copyRichAttribute(sourceNode, targetNode, "data-export-index");
    }

    if (tagName !== "a") {
      return;
    }

    if (sourceNode.hasAttribute("href") && isSafeHref(sourceNode.getAttribute("href"))) {
      copyRichAttribute(sourceNode, targetNode, "href");
    }

    if (sourceNode.hasAttribute("target")) {
      copyRichAttribute(sourceNode, targetNode, "target");
    }

    if (sourceNode.hasAttribute("rel")) {
      copyRichAttribute(sourceNode, targetNode, "rel");
    }
  }

  function appendSanitizedRichNode(parentNode, sourceNode, allowedTags) {
    if (sourceNode.nodeType === Node.TEXT_NODE) {
      parentNode.appendChild(document.createTextNode(sourceNode.textContent));
      return;
    }

    if (sourceNode.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    var tagName = sourceNode.tagName.toLowerCase();

    if (DROP_CONTENT_TAGS[tagName]) {
      return;
    }

    if (!allowedTags[tagName]) {
      Array.from(sourceNode.childNodes).forEach(function (childNode) {
        appendSanitizedRichNode(parentNode, childNode, allowedTags);
      });
      return;
    }

    var sanitizedNode = document.createElement(tagName);
    copySafeRichAttributes(sourceNode, sanitizedNode, tagName);

    Array.from(sourceNode.childNodes).forEach(function (childNode) {
      appendSanitizedRichNode(sanitizedNode, childNode, allowedTags);
    });

    parentNode.appendChild(sanitizedNode);
  }

  function replaceNodeChildren(targetNode, newChildren) {
    while (targetNode.firstChild) {
      targetNode.removeChild(targetNode.firstChild);
    }

    targetNode.appendChild(newChildren);
  }

  function normalizeRichField(node, allowedTags) {
    if (node.querySelector("[data-export-field]")) {
      return;
    }

    var fragment = document.createDocumentFragment();

    Array.from(node.childNodes).forEach(function (childNode) {
      appendSanitizedRichNode(fragment, childNode, allowedTags);
    });

    replaceNodeChildren(node, fragment);
  }

  function normalizePlainField(node) {
    node.textContent = node.textContent;
  }

  function normalizePreviewFieldValue(value) {
    return String(value == null ? "" : value).trim();
  }

  function normalizePreviewBooleanValue(value) {
    return normalizePreviewFieldValue(value).toLowerCase();
  }

  function isPreviewToggleEnabled(value) {
    return normalizePreviewBooleanValue(value) === "true";
  }

  function applyAllowedValuesValidation(node, fieldDefinition) {
    var fieldValue;
    var isAllowed;

    if (!fieldDefinition || !Array.isArray(fieldDefinition.allowedValues) || fieldDefinition.allowedValues.length === 0) {
      node.removeAttribute("data-export-invalid");
      node.removeAttribute("data-export-invalid-reason");
      return true;
    }

    fieldValue = normalizePreviewFieldValue(node.textContent);
    isAllowed = fieldDefinition.allowedValues.indexOf(fieldValue) !== -1;

    if (isAllowed) {
      node.removeAttribute("data-export-invalid");
      node.removeAttribute("data-export-invalid-reason");
      return true;
    }

    node.setAttribute("data-export-invalid", "true");
    node.setAttribute("data-export-invalid-reason", "allowed_values");
    return false;
  }

  function renderExportField(node, fieldTypes) {
    var fieldName = node.dataset.exportField;
    var fieldDefinition = fieldTypes[fieldName] || { type: "text", allowedValues: null };
    var fieldType = fieldDefinition.type || "text";

    if (fieldType === "rich_inline") {
      normalizeRichField(node, INLINE_RICH_TAGS);
      applyAllowedValuesValidation(node, fieldDefinition);
      return;
    }

    if (fieldType === "rich_full") {
      normalizeRichField(node, FULL_RICH_TAGS);
      applyAllowedValuesValidation(node, fieldDefinition);
      return;
    }

    normalizePlainField(node);
    applyAllowedValuesValidation(node, fieldDefinition);
  }

  function applyExportFieldBindings(root, fieldTypes) {
    if (!fieldTypes) {
      return;
    }

    var scope = root || document;
    var exportFieldNodes = [];

    if (scope.nodeType === Node.ELEMENT_NODE && scope.hasAttribute("data-export-field")) {
      exportFieldNodes.push(scope);
    }

    if (scope.querySelectorAll) {
      scope.querySelectorAll("[data-export-field]").forEach(function (node) {
        exportFieldNodes.push(node);
      });
    }

    exportFieldNodes.forEach(function (node) {
      renderExportField(node, fieldTypes);
    });
  }

  function findPreviewSourceNode(scope, toggleNode, fieldName) {
    var escapedFieldName = fieldName.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    var selector = '[data-export-field="' + escapedFieldName + '"]';
    var moduleScope = toggleNode.closest ? toggleNode.closest("[data-module]") : null;

    if (moduleScope) {
      return moduleScope.querySelector(selector);
    }

    if (scope.nodeType === Node.ELEMENT_NODE && scope.matches && scope.matches(selector)) {
      return scope;
    }

    if (scope.querySelector) {
      return scope.querySelector(selector);
    }

    return null;
  }

  function setPreviewModuleInvalid(moduleNode, reason) {
    if (!moduleNode) {
      return;
    }

    moduleNode.setAttribute("data-preview-invalid", "true");
    moduleNode.setAttribute("data-preview-invalid-reason", reason);
  }

  function clearPreviewModuleInvalid(moduleNode, reasonPrefix) {
    var currentReason;

    if (!moduleNode || !moduleNode.hasAttribute("data-preview-invalid")) {
      return;
    }

    currentReason = moduleNode.getAttribute("data-preview-invalid-reason") || "";

    if (reasonPrefix && currentReason.indexOf(reasonPrefix) !== 0) {
      return;
    }

    moduleNode.removeAttribute("data-preview-invalid");
    moduleNode.removeAttribute("data-preview-invalid-reason");
  }

  function applyPreviewToggleBindings(root) {
    var scope = root || document;
    var toggleNodes = [];

    if (scope.nodeType === Node.ELEMENT_NODE && scope.hasAttribute("data-preview-toggle-field")) {
      toggleNodes.push(scope);
    }

    if (scope.querySelectorAll) {
      scope.querySelectorAll("[data-preview-toggle-field][data-preview-toggle-class]").forEach(function (node) {
        toggleNodes.push(node);
      });
    }

    toggleNodes.forEach(function (node) {
      var toggleFieldName = node.dataset.previewToggleField;
      var toggleClassName = node.dataset.previewToggleClass;
      var sourceNode;
      var isEnabled;

      if (!toggleFieldName || !toggleClassName) {
        return;
      }

      sourceNode = findPreviewSourceNode(scope, node, toggleFieldName);
      isEnabled = sourceNode ? isPreviewToggleEnabled(sourceNode.textContent) : false;
      node.classList.toggle(toggleClassName, isEnabled);
    });
  }

  function resolvePreviewSizeState(scope, node, fieldTypes) {
    var sizeFieldName = node.dataset.previewSizeField;
    var legacyLargeFieldName = node.dataset.previewSizeLegacyLargeField;
    var legacySmallFieldName = node.dataset.previewSizeLegacySmallField;
    var sizeSourceNode = sizeFieldName ? findPreviewSourceNode(scope, node, sizeFieldName) : null;
    var sizeFieldDefinition = sizeFieldName ? fieldTypes[sizeFieldName] : null;
    var sizeValue = sizeSourceNode ? normalizePreviewFieldValue(sizeSourceNode.textContent) : "";
    var legacySmallSourceNode = legacySmallFieldName ? findPreviewSourceNode(scope, node, legacySmallFieldName) : null;
    var legacyLargeSourceNode = legacyLargeFieldName ? findPreviewSourceNode(scope, node, legacyLargeFieldName) : null;
    var showSmall = legacySmallSourceNode ? isPreviewToggleEnabled(legacySmallSourceNode.textContent) : false;
    var showLarge = legacyLargeSourceNode ? isPreviewToggleEnabled(legacyLargeSourceNode.textContent) : false;
    var resolvedSize = sizeValue;
    var invalidReason = "";
    var expectedSmall = false;
    var expectedLarge = false;

    if (showSmall && showLarge) {
      invalidReason = "headline-size-bridge-conflict";
    }

    if (!invalidReason && !resolvedSize) {
      if (showSmall) {
        invalidReason = "headline-size-legacy-small-unsupported";
      } else {
        resolvedSize = showLarge ? "l" : "m";
      }
    }

    if (!invalidReason && sizeSourceNode && !applyAllowedValuesValidation(sizeSourceNode, sizeFieldDefinition)) {
      invalidReason = "headline-size-allowed-values";
    }

    if (!invalidReason) {
      if (resolvedSize === "s") {
        expectedSmall = true;
      } else if (resolvedSize === "l") {
        expectedLarge = true;
      }

      if (showSmall !== expectedSmall || showLarge !== expectedLarge) {
        invalidReason = "headline-size-bridge-mismatch";
      }
    }

    return {
      sizeValue: resolvedSize,
      invalidReason: invalidReason,
      showSmall: showSmall,
      showLarge: showLarge
    };
  }

  function applyPreviewSizeBindings(root, fieldTypes) {
    var scope = root || document;
    var sizeNodes = [];

    if (scope.nodeType === Node.ELEMENT_NODE && scope.hasAttribute("data-preview-size-field")) {
      sizeNodes.push(scope);
    }

    if (scope.querySelectorAll) {
      scope.querySelectorAll("[data-preview-size-field]").forEach(function (node) {
        sizeNodes.push(node);
      });
    }

    sizeNodes.forEach(function (node) {
      var smallClassName = node.dataset.previewSizeSmallClass;
      var largeClassName = node.dataset.previewSizeLargeClass;
      var invalidClassName = node.dataset.previewSizeInvalidClass;
      var moduleNode = node.closest ? node.closest("[data-module]") : null;
      var sizeState;
      var sizeValue;

      if (!smallClassName || !largeClassName || !invalidClassName) {
        return;
      }

      sizeState = resolvePreviewSizeState(scope, node, fieldTypes || {});
      sizeValue = sizeState.sizeValue;
      node.classList.remove(smallClassName, largeClassName, invalidClassName);
      node.removeAttribute("data-preview-size-invalid");
      node.removeAttribute("hidden");
      clearPreviewModuleInvalid(moduleNode, "headline-size-");

      if (sizeState.invalidReason) {
        node.classList.add(invalidClassName);
        node.setAttribute("data-preview-size-invalid", "true");
        node.setAttribute("hidden", "");
        setPreviewModuleInvalid(moduleNode, sizeState.invalidReason);
        return;
      }

      if (sizeValue === "s") {
        node.classList.add(smallClassName);
        return;
      }

      if (sizeValue === "m") {
        return;
      }

      if (sizeValue === "l") {
        node.classList.add(largeClassName);
        return;
      }

      node.classList.add(invalidClassName);
      node.setAttribute("data-preview-size-invalid", "true");
      node.setAttribute("hidden", "");
      setPreviewModuleInvalid(moduleNode, "headline-size-allowed-values");
    });
  }

  function applyRuntime(root, tokens, fieldTypes) {
    var scope = root || document;

    isApplyingRuntime = true;

    try {
      if (tokens) {
        applyPreviewCssVars(tokens);
        applyTokenBindings(scope, tokens);
      }

      if (fieldTypes) {
        applyExportFieldBindings(scope, fieldTypes);
      }

      applyPreviewToggleBindings(scope);
      applyPreviewSizeBindings(scope, fieldTypes);
    } finally {
      isApplyingRuntime = false;
    }
  }

  function startMutationRefresh(tokens, fieldTypes) {
    if (observerStarted) {
      return;
    }

    observerStarted = true;

    var observer = new MutationObserver(function (mutations) {
      if (isApplyingRuntime) {
        return;
      }

      var shouldRefresh = mutations.some(function (mutation) {
        if (mutation.type === "characterData") {
          return true;
        }

        return mutation.addedNodes && mutation.addedNodes.length > 0;
      });

      if (!shouldRefresh) {
        return;
      }

      applyRuntime(document, tokens, fieldTypes);
    });

    observer.observe(document.body || document.documentElement, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  function run() {
    if (cachedTokensPromise && cachedFieldTypesPromise) {
      applyRuntime(document, cachedTokens, cachedFieldTypes);
      startMutationRefresh(cachedTokens, cachedFieldTypes);
      return;
    }

    Promise.all([
      fetchTokens(),
      fetchFieldTypes()
    ])
      .then(function (results) {
        cachedTokens = results[0];
        cachedFieldTypes = results[1];
        applyRuntime(document, cachedTokens, cachedFieldTypes);
        startMutationRefresh(cachedTokens, cachedFieldTypes);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();

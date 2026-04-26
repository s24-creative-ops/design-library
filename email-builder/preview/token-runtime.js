(function () {
  var cachedTokens = null;
  var observerStarted = false;

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

  function applyTokens(root, tokens) {
    applyPreviewCssVars(tokens);
    applyTokenBindings(root || document, tokens);
  }

  function startMutationRefresh(tokens) {
    if (observerStarted) {
      return;
    }

    observerStarted = true;

    var observer = new MutationObserver(function (mutations) {
      var shouldRefresh = mutations.some(function (mutation) {
        return mutation.addedNodes && mutation.addedNodes.length > 0;
      });

      if (!shouldRefresh) {
        return;
      }

      applyTokens(document, tokens);
    });

    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  function run() {
    if (cachedTokens) {
      applyTokens(document, cachedTokens);
      startMutationRefresh(cachedTokens);
      return;
    }

    fetch("../brand-map.json")
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
      .then(function (tokens) {
        if (!tokens) {
          return;
        }

        cachedTokens = tokens;
        applyTokens(document, tokens);
        startMutationRefresh(tokens);
      })
      .catch(function (error) {
        console.warn("preview token runtime failed", error);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();

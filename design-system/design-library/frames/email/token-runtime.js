(function () {
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

  function run() {
    fetch("../../../../tokens/brands/immoscout24.json")
      .then(function (response) { return response.json(); })
      .then(function (tokens) {
        applyPreviewCssVars(tokens);
        applyTokenBindings(document, tokens);
      })
      .catch(function (error) {
        console.warn("component-library frame token runtime failed", error);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();

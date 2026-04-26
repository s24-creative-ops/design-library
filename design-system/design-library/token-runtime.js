(function () {
  function resolveToken(tokens, path) {
    return path.split(".").reduce(function (value, key) {
      return value && value[key] !== undefined ? value[key] : undefined;
    }, tokens);
  }

  function applyRootCssVars(tokens) {
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

  function applySwatches(tokens) {
    document.querySelectorAll("[data-token-swatch]").forEach(function (swatch) {
      var path = swatch.getAttribute("data-token-swatch");
      var value = resolveToken(tokens, path);

      if (!value) {
        return;
      }

      var sample = swatch.querySelector("[data-token-swatch-sample]");
      var valueNode = swatch.querySelector("[data-token-swatch-value]");

      if (sample) {
        sample.style.background = value;
      }

      if (valueNode) {
        valueNode.textContent = String(value).toUpperCase();
      }
    });
  }

  function applyTokenText(tokens) {
    document.querySelectorAll("[data-token-text]").forEach(function (node) {
      var path = node.getAttribute("data-token-text");
      var value = resolveToken(tokens, path);

      if (value === undefined) {
        return;
      }

      node.textContent = String(value);
    });
  }

  function run() {
    fetch("../tokens/brands/immoscout24.json")
      .then(function (response) { return response.json(); })
      .then(function (tokens) {
        applyRootCssVars(tokens);
        applySwatches(tokens);
        applyTokenText(tokens);
      })
      .catch(function (error) {
        console.warn("component-library token runtime failed", error);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();

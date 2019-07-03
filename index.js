var postcss = require("postcss");

function createVariant(e, colorScheme, variantName) {
  return function({ container, separator }) {
    const supportsRule = postcss.atRule({
      name: "media",
      params: `(prefers-color-scheme: ${colorScheme})`
    });
    supportsRule.append(container.nodes);
    container.append(supportsRule);
    supportsRule.walkRules(rule => {
      rule.selector = `.${e(
        `${variantName}${separator}${rule.selector.slice(1)}`
      )}`;
    });
  };
}

module.exports = function() {
  return function({ addVariant, e }) {
    addVariant("light-mode", createVariant(e, "light", "light-mode"));
    addVariant("dark-mode", createVariant(e, "dark", "dark-mode"));
  };
};

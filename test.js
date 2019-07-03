const cssMatcher = require("jest-matcher-css");
const postcss = require("postcss");
const tailwindcss = require("tailwindcss");
const defaultConfig = require("tailwindcss/defaultConfig");
const preferredColorSchemePlugin = require("./index.js");

const generatePluginCss = (variants = []) => {
  return postcss(
    tailwindcss({
      theme: {
        screens: {
          sm: "640px"
        }
      },
      corePlugins: false,
      plugins: [
        preferredColorSchemePlugin(),
        ({ e, addUtilities }) => {
          addUtilities(
            {
              ".test": {
                display: "none"
              }
            },
            variants
          );
        }
      ]
    })
  )
    .process("@tailwind utilities", {
      from: undefined
    })
    .then(result => {
      return result.css;
    });
};

expect.extend({
  toMatchCss: cssMatcher
});

test("the plugin doesn’t do anything if the variants aren’t used", () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .test {
        display: none
      }
    `);
  });
});

test("the light-mode variant is working", () => {
  return generatePluginCss(["light-mode"]).then(css => {
    expect(css).toMatchCss(`
      .test {
        display: none
      }
      @media (prefers-color-scheme: light) {
        .light-mode\\:test {
          display: none
        }
      }
    `);
  });
});

test("the dark-mode variant is working", () => {
  return generatePluginCss(["dark-mode"]).then(css => {
    expect(css).toMatchCss(`
      .test {
        display: none
      }
      @media (prefers-color-scheme: dark) {
        .dark-mode\\:test {
          display: none
        }
      }
    `);
  });
});

test("multiple variants can be used together", () => {
  return generatePluginCss(["responsive", "dark-mode", "light-mode"]).then(
    css => {
      expect(css).toMatchCss(`
      .test {
        display: none
      }

      @media (prefers-color-scheme: dark) {
        .dark-mode\\:test {
          display: none
        }
      }

      @media (prefers-color-scheme: light) {
        .light-mode\\:test {
          display: none
        }
      }

      @media (min-width: 640px) {
        .sm\\:test {
          display: none
        }

        @media (prefers-color-scheme: dark) {
          .sm\\:dark-mode\\:test {
            display: none
          }
        }

        @media (prefers-color-scheme: light) {
          .sm\\:light-mode\\:test {
            display: none
          }
        }
      }
    `);
    }
  );
});

module.exports = {
  parserOptions: {
    ecmaVersion: 6
  },
  env: {
    browser: true,
    node: true
  },
  extends: "eslint:recommended",
  rules: {
    "linebreak-style": 0,
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "no-console": ["warn", { allow: ["error"] }],
    "quote-props": ["error", "always"],
    "max-len": [
      "warn",
      {
        code: 120,
        tabWidth: 4,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ]
  }
};

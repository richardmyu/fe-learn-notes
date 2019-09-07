module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  rules: {
    "no-irregular-whitespace": "off",
    "require-atomic-updates": "off",
    semi: ["error", "never"],
    quotes: ["error", "single"]
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaFeatures: {
      jsx: true,
      parserOptions: { ecmaVersion: 6 }
    }
  }
};

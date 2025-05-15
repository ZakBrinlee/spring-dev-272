// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  ignorePatterns: ["/dist/*"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "import/no-unresolved": "off",
    semi: ["error", "always"], // enforces semicolons
    quotes: ["error", "double"], // enforces single quotes
    "comma-dangle": ["error", "always-multiline"], // enforces trailing commas
  },
};

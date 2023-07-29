const path = require("path");

module.exports = {
  extends: ["airbnb", "prettier"],
  plugins: ["react", "prettier", "only-warn"],
  settings: {
    "import/resolver": {
      node: {
        paths: [path.resolve(__dirname, "src")],
      },
    },
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    babelOptions: {
      presets: [
        ["babel-preset-react-app", false],
        process.env.NODE_ENV === "production"
          ? "babel-preset-react-app/prod"
          : process.env.NODE_ENV === "test"
          ? "babel-preset-react-app/test"
          : "babel-preset-react-app/dev",
      ],
    },
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  rules: {
    "react/jsx-filename-extension": "off",
    "no-underscore-dangle": "off",
    "import/first": "error",
    "linebreak-style": "off",
  },
};

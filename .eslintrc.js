const path = require("path");

module.exports = {
  extends: [
    "airbnb",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["react", "prettier", "only-warn", "react", "import", "react-hooks"],
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
    'prettier/prettier': 0,
    "react/jsx-filename-extension": "off",
    "no-underscore-dangle": "off",
    "import/first": "error",
    "linebreak-style": "off",
  },
};

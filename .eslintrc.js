const path = require("path");

module.exports = {
  extends: ["airbnb", "prettier"],
  plugins: ["react", "prettier", "only-warn"],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    babelOptions: {
      presets: [
        ['babel-preset-react-app', false],
        (process.env.NODE_ENV === 'production')
          ? 'babel-preset-react-app/prod'
          : (process.env.NODE_ENV === 'test')
            ? 'babel-preset-react-app/test'
            : 'babel-preset-react-app/dev',
      ],
      plugins: [
        ["@babel/plugin-transform-class-properties", { loose: true }],
        ["@babel/plugin-transform-private-methods", { loose: true }],
        ["@babel/plugin-transform-private-property-in-object", { loose: true }]
      ]
    },
    ecmaVersion: 2016,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    browser: true,
    jest: true
  },
  rules: {
    "react/jsx-filename-extension": "off",
    "no-underscore-dangle": "off",
    "import/first": "error",
    "linebreak-style": "off",
  },
};

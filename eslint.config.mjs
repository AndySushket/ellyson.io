import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);


export default [
  {
    // extends: ["eslint:recommended", "plugin:react/recommended", "react-app", "prettier"],
    // plugins: ["react", "prettier", "only-warn"],
    settings: {
      "import/resolver": {
        node: {
          paths: [path.resolve(__dirname, "src")],
          "extensions": [".js", ".jsx", ".ts", ".tsx"]
        },
      },
    },
    // parserOptions: {
    //   "ecmaVersion": 2021,
    //   "sourceType": "module",
    //   "ecmaFeatures": {
    //     "jsx": true
    //   }
    // },
    // env: {
    //   es6: true,
    //   browser: true,
    //   jest: true,
    // },
    rules: {
      semi: "error",
      "prefer-const": "error",
      'no-plusplus': 'off',
      'no-param-reassign': 'off',
      "react/jsx-filename-extension": "off",
      "no-underscore-dangle": "off",
      // "import/first": "error",
      "linebreak-style": "off",
      // "import/extensions": [
      //   "error",
      //   "ignorePackages",
      //   {
      //     "js": "never",
      //     "jsx": "never",
      //     "ts": "never",
      //     "tsx": "never"
      //   }
      // ]
    },
  }
];

const {
  addWebpackModuleRule,
  override,
  addWebpackAlias,
// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
} = require("customize-cra");
// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
module.exports = {
  webpack: override(
    addWebpackAlias({
      // eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
      "~": path.resolve(__dirname, "src"),
    }),
    addWebpackModuleRule({
      test: /\.(shader|vert|frag|glsl|fnt)$/,
      loader: "raw-loader",
    }),
  ),
};

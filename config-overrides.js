const path = require("path");
const {
  addWebpackModuleRule,
  override,
  addWebpackAlias,
} = require("customize-cra");

module.exports = {
  webpack: override(
    addWebpackModuleRule({
      test: /\.(shader|vert|frag|glsl|fnt)$/,
      loader: require.resolve("raw-loader"),
    })
  ),
};

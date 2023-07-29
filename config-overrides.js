const { addWebpackModuleRule, override } = require("customize-cra");

module.exports = {
  webpack: override(
    addWebpackModuleRule({
      test: /\.(shader|vert|frag|glsl|fnt)$/,
      loader: require.resolve("raw-loader"),
    }),
  ),
};

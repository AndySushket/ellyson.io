const path = require("path");
const { addWebpackModuleRule, override, addWebpackAlias} = require("customize-cra");

module.exports = {
  webpack: override(
    addWebpackAlias({
      "@": path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, 'src/components'),
      assets: path.resolve(__dirname, 'src/assets'),
      utils: path.resolve(__dirname, 'src/utils'),
      styles: path.resolve(__dirname, 'src/styles'),
    }),
    addWebpackModuleRule({
      test: /\.(shader|vert|frag|glsl|fnt)$/,
      loader: require.resolve("raw-loader"),
    })
  ),
};

const path = require('path');
const { addWebpackModuleRule, override, addWebpackAlias } = require('customize-cra');

module.exports = {
  webpack: override(
    addWebpackAlias({
      '~': path.resolve(__dirname, 'src'),
    }),
    addWebpackModuleRule({
      test: /\.(shader|vert|frag|glsl|fnt)$/,
      loader: 'raw-loader',
    }),
  ),
};

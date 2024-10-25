const path = require('path');
const { addWebpackModuleRule, override, addWebpackAlias } = require('customize-cra');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  webpack: override(
    (config) => {
      // Устанавливаем context для Webpack, чтобы пути считались от папки src
      config.context = path.resolve(__dirname, 'src');

      const tsCheckerPlugin = config.plugins.find(
        (plugin) => plugin instanceof ForkTsCheckerWebpackPlugin
      );

      if (tsCheckerPlugin) {
        tsCheckerPlugin.options.typescript.configFile = path.resolve(__dirname, 'tsconfig.json');
      }

      // Возвращаем измененный конфиг, сохранив существующие алиасы
      return config;
    },
    addWebpackAlias({
      '~': path.resolve(__dirname, 'src'),
    }),
    addWebpackModuleRule({
      test: /\.(shader|vert|frag|glsl|fnt)$/,
      loader: 'raw-loader',
    }),
    addWebpackModuleRule({
      test: /\.(gltf|glb)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]', // Сохраняем оригинальное имя и расширение
          },
        },
      ],
    }),
  ),
};

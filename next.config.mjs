/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push(
      {
        test: /\.(shader|vert|frag|glsl|fnt)$/,
        use: 'raw-loader',
      },
      {
        test: /\.(fbx|mp3|wav|ogg|flac)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash][ext]',
        },
      },
      {
        test: /\.(pdf|json)$/, // Расширьте список, если нужно обрабатывать другие типы аудиофайлов
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]', // Настройка имени выходных файлов
          },
        },
      },
      {
        test: /\.(hdr)$/, // Расширьте список, если нужно обрабатывать другие типы аудиофайлов
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]', // Настройка имени выходных файлов
          },
        },
      },
    );
    return config;
  },
  // output: 'standalone', // Outputs a Single-Page Application (SPA).
  output: 'export', // Outputs a static site using `next export`.
  distDir: 'out', // The directory where the build is written to. Default is `.next`.
}

export default nextConfig

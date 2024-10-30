/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push(
      {
        test: /\.(shader|vert|frag|glsl|fnt)$/,
        use: 'raw-loader',
      },
    );
    return config;
  },
  output: 'standalone', // Outputs a Single-Page Application (SPA).
  distDir: './build', // Changes the build output directory to `./dist`.
}

export default nextConfig

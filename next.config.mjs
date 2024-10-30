/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone', // Outputs a Single-Page Application (SPA).
  distDir: './build', // Changes the build output directory to `./dist`.
}

export default nextConfig

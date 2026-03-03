import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['atoms'],
  eslint: {
    // The root workspace ESLint config targets the atoms library (react-refresh rules).
    // The docs app has its own eslint.config.mjs; skip the built-in next build lint pass.
    ignoreDuringBuilds: true,
  },
}

export default nextConfig

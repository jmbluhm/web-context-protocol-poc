/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig 
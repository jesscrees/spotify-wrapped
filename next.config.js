/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent-ams4-1.xx.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      }
    ]
  },
  reactStrictMode: true,
}

module.exports = nextConfig

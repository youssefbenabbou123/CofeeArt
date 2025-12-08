/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Proxy API requests through Vercel to bypass Railway CORS issues
  async rewrites() {
    return {
      // beforeFiles: rewrites that run BEFORE pages/public files are checked
      // This ensures /api/* always goes to Railway
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: 'https://coffee-arts-backend.railway.app/api/:path*',
        },
      ],
    };
  },
}

export default nextConfig


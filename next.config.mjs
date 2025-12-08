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
  // Browser calls /api/* on Vercel, Vercel forwards to Railway (server-to-server, no CORS)
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://coffee-arts-backend.railway.app';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
}

export default nextConfig

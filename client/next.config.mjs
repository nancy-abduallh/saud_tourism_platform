const API = process.env.API_ORIGIN || 'http://localhost:4001';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/api/:path*', destination: `${API}/api/:path*` },
      { source: '/uploads/:path*', destination: `${API}/uploads/:path*` },
    ];
  },
};

export default nextConfig;

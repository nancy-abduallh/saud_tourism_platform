import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API = process.env.API_ORIGIN || 'http://localhost:4001';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  async rewrites() {
    if (process.env.API_ORIGIN && process.env.API_ORIGIN !== 'http://localhost:4001') {
      return [
        { source: '/api/:path*', destination: `${process.env.API_ORIGIN}/api/:path*` },
        { source: '/uploads/:path*', destination: `${process.env.API_ORIGIN}/uploads/:path*` },
      ];
    }
    return [];
  },
};

export default nextConfig;

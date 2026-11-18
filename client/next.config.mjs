import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API = process.env.API_ORIGIN || 'http://localhost:4001';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  experimental: {
    cpus: 2,
    workerThreads: false,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
          },
        ],
      },
    ];
  },
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

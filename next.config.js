const { NextConfig } = require("next");

const nextConfig = {
  /* config options here */
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    // Add any external domains for images here
  },
  // Configure headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev',
        port: '',
        pathname: '/7hsx9nide9mchi92/**',
      },
    ],
  },
};

module.exports = nextConfig;

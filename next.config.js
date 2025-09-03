/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'd18xm8l1snf084.cloudfront.net' }, // or your cdn domain
      { protocol: 'https', hostname: 'cdn.inschekr.com' },
    ],
  },
};

module.exports = nextConfig;

const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_BACK_API_DOMAIN],
  },
};

module.exports = nextConfig;

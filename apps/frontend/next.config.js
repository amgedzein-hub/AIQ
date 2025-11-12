/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    return config;
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // Disable static optimization for not-found pages
  experimental: {
    // Skip prerendering not-found pages
  },
};

const wrappedConfig = withNextIntl(nextConfig);

// Override the build process to skip not-found prerendering
module.exports = {
  ...wrappedConfig,
  onDemandEntries: {
    ...(wrappedConfig.onDemandEntries || {}),
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};

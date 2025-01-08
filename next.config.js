/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...(config.externals || []), "better-sqlite3"];
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true, // This will ignore ESLint errors during build
  },
};

module.exports = nextConfig; 
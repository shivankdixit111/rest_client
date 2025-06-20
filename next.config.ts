/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@mikro-orm/core', '@mikro-orm/postgresql'],
  },
  webpack: (config: any) => {
    config.externals.push({
      '@mikro-orm/core': 'commonjs @mikro-orm/core',
      '@mikro-orm/postgresql': 'commonjs @mikro-orm/postgresql'
    });
    return config;
  }
};

module.exports = nextConfig;
const CopyPlugin = require('copy-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const config = {
  transpilePackages: ['prospero'],
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false,
  },
  async headers() {
    return [
      {
        source: '/source/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(config);

const CopyPlugin = require('copy-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const config = {
  transpilePackages: ['prospero', 'ai-ui-components', 'author-map-ui'],
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
      {
        source: '/api/prospero/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://jayleewriter.com',
          },
          { key: 'Access-Control-Allow-Methods', value: 'GET' },
        ],
      },
      {
        source: '/api/author(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://jayleewriter.com',
          },
          { key: 'Access-Control-Allow-Methods', value: 'GET' },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(config);

const CopyPlugin = require('copy-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const config = {
  output: 'export',
  transpilePackages: ['prospero'],
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false,
  },
  webpack: (config) => {
    return {
      ...config,
      plugins: config.plugins.concat(
        new CopyPlugin({
          patterns: [
            {
              from: './node_modules/rpg-game-poc',
              to: '../public/rpg-game-source',
            },
          ],
        })
      ),
    };
  },
};

module.exports = withBundleAnalyzer(config);

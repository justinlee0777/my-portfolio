const CopyPlugin = require('copy-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const config = {
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

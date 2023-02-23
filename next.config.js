const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  webpack: (config) => {
    return {
      ...config,
      plugins: config.plugins.concat(
        new CopyPlugin({
          patterns: [
            { from: "./node_modules/rpg-game-poc", to: "../public/rpg-game" },
          ],
        })
      ),
    };
  },
};

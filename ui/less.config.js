const { createLoader } = require("simple-functional-loader");
const lessRegex = /\.less$/;

module.exports = {
  webpack(config, options) {
    config.module.rules.push({
      test: lessRegex,
      use: options.defaultLoaders.less,
    });

    // Use Ant Design's less files
    config.module.rules.push({
      test: lessRegex,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: [
        options.defaultLoaders.babel,
        createLoader(function (source) {
          return {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true, // this line is important
              },
            },
          };
        }),
      ],
    });

    return config;
  },
};

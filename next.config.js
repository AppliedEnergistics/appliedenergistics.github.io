/** @type {import('next').NextConfig} */

const path = require("path");

module.exports = {
  output: 'export',
  reactStrictMode: true,
  images: {
    loader: "custom",
  },
  webpack: (config) => {
    config.module.rules = [
      ...config.module.rules,
      {
        test: /all-pages.json$/,
        use: [
          {
            loader: "val-loader",
            options: {
              executableFile: path.resolve(
                __dirname,
                "data",
                "generate-all-pages.js"
              ),
            },
          },
        ],
      },
    ];
    return config;
  },
};

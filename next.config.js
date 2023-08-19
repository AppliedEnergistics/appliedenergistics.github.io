/** @type {import('next').NextConfig} */

import path from "node:path";
import url from "node:url";

export const config = {
  output: "export",
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
                path.dirname(url.fileURLToPath(import.meta.url)),
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

export default config;

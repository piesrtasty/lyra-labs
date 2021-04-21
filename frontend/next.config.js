const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  target: "serverless",
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    NPM_TOKEN: process.env.NPM_TOKEN,
    MAGIC_PUBLISHABLE_KEY: process.env.MAGIC_PUBLISHABLE_KEY,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // alias commonly used modules
    // https://webpack.js.org/configuration/resolve/#resolvealias
    config.resolve.alias = {
      "@config": path.resolve(__dirname, "config/"),
      "@data": path.resolve(__dirname, "data/"),
      "@components": path.resolve(__dirname, "components/"),
      "@library": path.resolve(__dirname, "shared/library/"),
      "@style": path.resolve(__dirname, "shared/style/"),
      "@enhancers": path.resolve(__dirname, "shared/enhancers/"),
      ...config.resolve.alias,
    };
    config.module.rules.push({ test: /\.cdc/, use: "raw-loader" });

    return config;
  },
});

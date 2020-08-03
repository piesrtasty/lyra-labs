const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  target: "serverless",
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_SCOPE: "openid profile email",
    REDIRECT_URI:
      process.env.REDIRECT_URI || "http://localhost:3000/api/callback",
    POST_LOGOUT_REDIRECT_URI:
      process.env.POST_LOGOUT_REDIRECT_URI || "http://localhost:3000/",
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    SESSION_COOKIE_LIFETIME: process.env.SESSION_COOKIE_LIFETIME,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // alias commonly used modules
    // https://webpack.js.org/configuration/resolve/#resolvealias
    config.resolve.alias = {
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

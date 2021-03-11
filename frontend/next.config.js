const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  target: "serverless",
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    MAGIC_PUBLISHABLE_KEY: process.env.MAGIC_PUBLISHABLE_KEY,
    NPM_TOKEN: process.env.NPM_TOKEN,
    MAGIC_PUBLISHABLE_KEY: process.env.MAGIC_PUBLISHABLE_KEY,

    FLOW_CONFIG: {
      development: {
        TOKEN_CONTRACT_ADDRESS: process.env.LOCAL_TOKEN_CONTRACT_ADDRESS,
        AWARD_CONTRACT_ADDRESS: process.env.LOCAL_AWARD_CONTRACT_ADDRESS,
        ACCESS_NODE_API: process.env.LOCAL_ACCESS_NODE_API,
        CHALLENGE_HANDSHAKE: process.env.LOCAL_CHALLENGE_HANDSHAKE,
        NETWORK: process.env.LOCAL_NETWORK,
      },
      production: {
        TOKEN_CONTRACT_ADDRESS: process.env.TESTNET_TOKEN_CONTRACT_ADDRESS,
        AWARD_CONTRACT_ADDRESS: process.env.TESTNET_AWARD_CONTRACT_ADDRESS,
        ACCESS_NODE_API: process.env.TESTNET_ACCESS_NODE_API,
        CHALLENGE_HANDSHAKE: process.env.TESTNET_CHALLENGE_HANDSHAKE,
        NETWORK: process.env.TESTNET_NETWORK,
      },
    },
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

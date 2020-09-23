module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        extensions: [".js", ".jsx", ".json"],
        alias: {
          "@components": "./src/components",
          "@data": "./src/data",
          "@lib": "./src/lib",
          "@screens": "./src/screens",
          "@shared": "./src/shared",
          "@assets": "./assets",
        },
      },
    ],
  ],
};

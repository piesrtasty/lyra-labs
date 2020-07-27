const fs = require("fs");

require.extensions[".cdc"] = function(module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};

const FungibleToken = require("../contracts/FungibleToken.cdc");

console.log(FungibleToken);

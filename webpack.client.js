const path = require("path");
const merge = require("webpack-merge");
const config = require("./webpack.config");

const clientConfig = {
  entry: "./src/client/index.js", // Root File Of React Pipe
  output: {
    filename: "client_bundle.js", // Client Bundle File
    path: path.join(__dirname, "src/public") // Client Output Path
  }
};

module.exports = merge(config, clientConfig);

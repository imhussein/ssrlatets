const path = require("path");
const merge = require("webpack-merge");
const config = require("./webpack.config");

// Webpack Server Config
const serverConfig = {
  // Set Target For Node Js To Inform Webpack To Build For Nodejs (Not Browser)
  target: "node",
  entry: "./src/index.js", // Root File Of The Render Server
  output: {
    filename: "server_bundle.js", // Server Bundle File
    path: path.join(__dirname, "src/server") // Server Output Path
  }
};

module.exports = merge(config, serverConfig);

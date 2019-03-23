var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  mode: 'development',
  // devtool: debug ? "inline-sourcemap" : null,
  devtool: "inline-sourcemap",
  entry: "./scripts/main.js",
  output: {
    path: __dirname,
    filename: "scripts.min.js",
    libraryTarget: 'var',
    library: 'GLOB'
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
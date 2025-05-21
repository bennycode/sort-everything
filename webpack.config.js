// @ts-check
const path = require('path');

/** @type {import('webpack').Configuration} */
const config = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        test: /\.(js|jsx)$/i,
        loader: "babel-loader"
      }
    ]
  },
  output: {
    path: path.resolve("./dist")
  },
  plugins: []
};

export default config;

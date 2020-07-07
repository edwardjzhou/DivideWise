// In package.lock.json "requires" reflects dependencies from package.json file, while "dependencies" reflects actually installed dependencies in node_modules folder of this dependency.

const path = require("path");

module.exports = {
  context: __dirname,
  entry: ["babel-polyfill", "./frontend/index.jsx"], // it starts buliding its dependency graph here
  output: {
    path: path.resolve(__dirname, "app", "assets", "javascripts"), // rails sprockets will inject the huge bundle.js into users' browsers
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["@babel/env", "@babel/react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", "*"],
  },
};

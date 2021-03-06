const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
const plugins = [
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "index.html"
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  })
];

const rules = [
  {
    test: /\.(js|jsx)$/,
    include: [path.resolve(__dirname, "src")],
    exclude: /node_modules/,
    loader: "babel-loader"
  },
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      devMode ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: true,
          sourceMap: true,
          importLoaders: 2,
          localIdentName: "[name]__[local]___[hash:base64:5]"
        }
      },
      "sass-loader"
    ]
  }
];
const common = {
  mode: process.env.NODE_ENV,
  entry: {
    index: ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "src")],
    extensions: [".js", ".json", ".jsx", ".css"],
    alias: {
      "react-super-lite": path.resolve(
        __dirname,
        //"src/React/index.js"
        "node_modules/react-super-lite/lib/react-super-lite.js"
      )
    }
  },
  performance: {
    hints: "warning",
    maxEntrypointSize: 400000,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
    }
  },
  devtool: "source-map",
  context: __dirname,
  target: "web",
  plugins
};
module.exports =common;
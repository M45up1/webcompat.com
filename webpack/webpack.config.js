const path = require("path");
const webpack = require("webpack");
const entries = require("./entries.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: entries,
  mode: "development",
  devtool: "inline-source-map",
  context: path.resolve(__dirname, "../webcompat/static"),
  output: {
    path: path.join(__dirname, "../webcompat/static/dist"),
  },
  module: {
    rules: [
      {
        test: /\.jst$/,
        use: [
          {
            loader: path.resolve(__dirname, "./loaders/strip-tags.js"),
          },
          {
            loader: "ejs-loader",
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, "../webcompat/static/js/vendor"),
        ],
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, "../webcompat/static/js/vendor")],
    alias: {
      templates: path.resolve(__dirname, "../webcompat/templates/"),
      jquery: "jquery-3.3.1.min.js",
      underscore: "lodash.custom.min.js",
      Backbone: "backbone-1.3.3.min.js",
      Mousetrap: "mousetrap-min.js",
      Prism: "prism.js",
      BackboneMousetrap: "backbone.mousetrap.js",
    },
  },
  plugins: [
    //make underscore and jquery global for jst templates
    new webpack.ProvidePlugin({
      _: "underscore",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};

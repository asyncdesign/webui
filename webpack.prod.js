const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ConcatPlugin = require('webpack-concat-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].min.css',
  allChunks: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = {
  entry: {webui: ["./src/js/main.js","./src/scss/webui.scss"]},
  plugins: [
    new ConcatPlugin({
      uglify: true,
      fileName: 'js/webui.min.js',
      filesToConcat: ["./src/js/main.js", 
        "./src/js/_menus.js", 
        "./src/js/_alerts.js", 
        "./src/js/_tooltips.js", 
        "./src/js/_modals.js", 
        "./src/js/_upload.js", 
        "./src/js/_tabs.js",
        "./src/js/_shapes.js",
        "./src/js/_positioning.js",
        "./src/js/_transitions.js"
      ]
    }),
    new ConcatPlugin({
      uglify: true,
      fileName: 'js/webui-utils.min.js',
      filesToConcat: ["./src/js/utils.js"]
    }),
    new ConcatPlugin({
      uglify: true,
      fileName: 'js/webui-validation.min.js',
      filesToConcat: ["./src/js/validation.js"]
    }),
    extractSass,
  ],
  module: {
    rules: [{
      test: /\.scss$/,
      use: extractSass.extract({
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: false,
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: false,
          },
        }],
        fallback: 'style-loader',
      }),
    }],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].min.js',
  },
};

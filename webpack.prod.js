//process.traceDeprecation = true;

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ConcatPlugin = require('webpack-concat-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

module.exports = {

  entry: {"webui-all": ["./src/js/main.js","./src/scss/webui-all.scss"],
          "webui-all-grid": ["./src/js/main.js","./src/scss/webui-all-grid.scss"],
          "webui-all-flexbox": ["./src/js/main.js","./src/scss/webui-all-flexbox.scss"],
          "webui-standard": ["./src/js/main.js","./src/scss/webui-standard.scss"],
          "webui-standard-grid": ["./src/js/main.js","./src/scss/webui-standard-grid.scss"],
          "webui-standard-flexbox": ["./src/js/main.js","./src/scss/webui-standard-flexbox.scss"],
          "webui-basic": ["./src/js/main.js","./src/scss/webui-basic.scss"],
          "webui-basic-grid": ["./src/js/main.js","./src/scss/webui-basic-grid.scss"],
          "webui-basic-flexbox": ["./src/js/main.js","./src/scss/webui-basic-flexbox.scss"],
          "webui-styles-all": ["./src/js/main.js","./src/scss/webui-styles-all.scss"],
          "webui-styles-all-grid": ["./src/js/main.js","./src/scss/webui-styles-all-grid.scss"],
          "webui-styles-all-flexbox": ["./src/js/main.js","./src/scss/webui-styles-all-flexbox.scss"],
          "webui-styles-standard": ["./src/js/main.js","./src/scss/webui-styles-standard.scss"],
          "webui-styles-standard-grid": ["./src/js/main.js","./src/scss/webui-styles-standard-grid.scss"],
          "webui-styles-standard-flexbox": ["./src/js/main.js","./src/scss/webui-styles-standard-flexbox.scss"],
          "webui-styles-basic": ["./src/js/main.js","./src/scss/webui-styles-basic.scss"],
          "webui-styles-basic-grid": ["./src/js/main.js","./src/scss/webui-styles-basic-grid.scss"],
          "webui-styles-basic-flexbox": ["./src/js/main.js","./src/scss/webui-styles-basic-flexbox.scss"]  
  },
  plugins: [
    new ConcatPlugin({
      uglify: true,
      fileName: 'js/webui-all.min.js',
      filesToConcat: ["./src/js/main.js", 
        "./src/js/_menus.js", 
        "./src/js/_alerts.js", 
        "./src/js/_tooltips.js", 
        "./src/js/_modals.js", 
        "./src/js/_upload.js", 
        "./src/js/_tabs.js",
        "./src/js/_radial.js",
        "./src/js/_carousel.js",
        "./src/js/_shapes.js",
        "./src/js/_scrollspy.js",
        "./src/js/_positioning.js",
        "./src/js/_transitions.js",
        "./src/js/_validation.js"
      ]
    }),
    new ConcatPlugin({
      uglify: true,
      fileName: 'js/webui-standard.min.js',
      filesToConcat: ["./src/js/main.js", 
        "./src/js/_menus.js", 
        "./src/js/_alerts.js", 
        "./src/js/_tooltips.js", 
        "./src/js/_modals.js", 
        "./src/js/_upload.js", 
        "./src/js/_tabs.js",
        "./src/js/_radial.js",
        "./src/js/_carousel.js",
        "./src/js/_scrollspy.js",
        "./src/js/_positioning.js",
        "./src/js/_transitions.js",
        "./src/js/_validation.js" 
      ]
    }),
    new ConcatPlugin({
      uglify: true,
      fileName: 'js/webui-basic.min.js',
      filesToConcat: ["./src/js/main.js"]
    }),
    new ConcatPlugin({
      uglify: true,
      fileName: 'js/webui-utils.min.js',
      filesToConcat: ["./src/js/utils.js"]
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].min.css"
    }),
    new RemovePlugin({
      after: {
        root: path.resolve(__dirname, 'dist'),
        include: [
          'js/webui-all-flexbox.min.js', 
          'js/webui-all-grid.min.js',
          'js/webui-basic-flexbox.min.js', 
          'js/webui-basic-grid.min.js',
          'js/webui-standard-flexbox.min.js', 
          'js/webui-standard-grid.min.js',
          'js/webui-styles-all.min.js', 
          'js/webui-styles-all-flexbox.min.js',
          'js/webui-styles-all-grid.min.js', 
          'js/webui-styles-basic.min.js', 
          'js/webui-styles-basic-flexbox.min.js',
          'js/webui-styles-basic-grid.min.js', 
          'js/webui-styles-standard.min.js', 
          'js/webui-styles-standard-flexbox.min.js',
          'js/webui-styles-standard-grid.min.js'
        ]
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false,
              sourceMap: false
            }
          },
          "sass-loader"
        ]
      }
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].min.js',
  },
  mode: 'production',
  stats: {
    all: false,
    warnings: false,
    errors: true,
    errorDetails: true,
    modules: false,
    moduleTrace: false
  }
};

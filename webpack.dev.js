//process.traceDeprecation = true;

const path = require('path');
//const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ConcatPlugin = require('webpack-concat-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');
const WebpackMessages = require('webpack-messages');

module.exports = {

  entry: {"webui-components-all": ["./src/scss/webui-components-all.scss"],
          "webui-components-standard": ["./src/scss/webui-components-standard.scss"],
          "webui-components-basic": ["./src/scss/webui-components-basic.scss"],
          "webui-all": ["./src/scss/webui-all.scss"],         
          "webui-standard": ["./src/scss/webui-standard.scss"],
          "webui-basic": ["./src/scss/webui-basic.scss"]
  },
  plugins: [
    new ConcatPlugin({
      uglify: {
        compress: false,
        mangle: false,
        output: {
          beautify: true,
          comments: "core + components"
        }
      },
      fileName: 'js/webui-components.js',
      filesToConcat: ["./src/js/main.js", 
        "./src/js/_menus.js",
        "./src/js/_navbar.js",
        "./src/js/_navbutton.js",
        "./src/js/_alerts.js", 
        "./src/js/_tooltips.js", 
        "./src/js/_modals.js", 
        "./src/js/_upload.js",
        "./src/js/_zoom.js",
        "./src/js/_tabs.js",
        "./src/js/_radial.js",
        "./src/js/_carousel.js",
        "./src/js/_shapes.js",
        "./src/js/_scrollspy.js",
        "./src/js/_animation.js",
        "./src/js/_validation.js"
      ]
    }),
    new ConcatPlugin({
      uglify: {
        compress: false,
        mangle: false,
        output: {
          beautify: true,
          comments: "core"
        }
      },
      fileName: 'js/webui.js',
      filesToConcat: ["./src/js/main.js"]
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    new RemovePlugin({
      after: {
        root: path.resolve(__dirname, 'dist'),
        include: [
          'js/webui-all.js', 
          'js/webui-standard.js', 
          'js/webui-basic.js',
          'js/webui-components-all.js', 
          'js/webui-components-standard.js', 
          'js/webui-components-basic.js'
        ],
        log: false
      }
    }),
    new WebpackMessages({
      name: 'development',
      logger: str => console.log(`\n> ${str}`)
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
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  mode: 'development',
  stats: {
    all: false,
    warnings: true,
    errors: true, 
    errorDetails: true,
    modules: false,
    moduleTrace: true
  },
  watch: true
};

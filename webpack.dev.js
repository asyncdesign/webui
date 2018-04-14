const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ConcatPlugin = require('webpack-concat-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].css',
  allChunks: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = {
  entry: {"webui-all": ["./src/js/main.js","./src/scss/webui-all.scss"],
          "webui-all-grid": ["./src/js/main.js","./src/scss/webui-all-grid.scss"],
          "webui-all-flexbox": ["./src/js/main.js","./src/scss/webui-all-flexbox.scss"],
          "webui-standard": ["./src/js/main.js","./src/scss/webui-standard.scss"],
          "webui-standard-grid": ["./src/js/main.js","./src/scss/webui-standard-grid.scss"],
          "webui-standard-flexbox": ["./src/js/main.js","./src/scss/webui-standard-flexbox.scss"],
          "webui-basic": ["./src/js/main.js","./src/scss/webui-basic.scss"],
          "webui-basic-grid": ["./src/js/main.js","./src/scss/webui-basic-grid.scss"],
          "webui-basic-flexbox": ["./src/js/main.js","./src/scss/webui-basic-flexbox.scss"]  
  },
  plugins: [
    new ConcatPlugin({
      uglify: {
      compress: false,
      mangle: false,
      output: {
        beautify: true,
        comments: "all"
      },
    },
      fileName: 'js/webui-all.js',
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
        "./src/js/_positioning.js",
        "./src/js/_transitions.js",
        "./src/js/_validation.js"
      ]
    }),
    new ConcatPlugin({
      uglify: {
      compress: false,
      mangle: false,
      output: {
        beautify: true,
        comments: "all grid"
      },
    },
      fileName: 'js/webui-all-grid.js',
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
        "./src/js/_positioning.js",
        "./src/js/_transitions.js",
        "./src/js/_validation.js" 
      ]
    }),
    new ConcatPlugin({
      uglify: {
      compress: false,
      mangle: false,
      output: {
        beautify: true,
        comments: "all flexbox"
      },
    },
      fileName: 'js/webui-all-flexbox.js',
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
        "./src/js/_positioning.js",
        "./src/js/_transitions.js",
        "./src/js/_validation.js"
      ]
    }),
    new ConcatPlugin({
      uglify: {
      compress: false,
      mangle: false,
      output: {
        beautify: true,
        comments: "standard"
      },
    },
      fileName: 'js/webui-standard.js',
      filesToConcat: ["./src/js/main.js", 
        "./src/js/_menus.js", 
        "./src/js/_alerts.js", 
        "./src/js/_tooltips.js", 
        "./src/js/_modals.js", 
        "./src/js/_upload.js", 
        "./src/js/_tabs.js",
        "./src/js/_radial.js",
        "./src/js/_carousel.js",
        "./src/js/_positioning.js",
        "./src/js/_transitions.js",
        "./src/js/_validation.js" 
      ]
    }),
    new ConcatPlugin({
      uglify: {
      compress: false,
      mangle: false,
      output: {
        beautify: true,
        comments: "standard grid"
      },
    },
      fileName: 'js/webui-standard-grid.js',
      filesToConcat: ["./src/js/main.js", 
        "./src/js/_menus.js", 
        "./src/js/_alerts.js", 
        "./src/js/_tooltips.js", 
        "./src/js/_modals.js", 
        "./src/js/_upload.js", 
        "./src/js/_tabs.js",
        "./src/js/_radial.js",
        "./src/js/_carousel.js",
        "./src/js/_positioning.js",
        "./src/js/_transitions.js",
        "./src/js/_validation.js"
      ]
    }),
    new ConcatPlugin({
      uglify: {
      compress: false,
      mangle: false,
      output: {
        beautify: true,
        comments: "standard flexbox"
      },
    },
      fileName: 'js/webui-standard-flexbox.js',
      filesToConcat: ["./src/js/main.js", 
        "./src/js/_menus.js", 
        "./src/js/_alerts.js", 
        "./src/js/_tooltips.js", 
        "./src/js/_modals.js", 
        "./src/js/_upload.js", 
        "./src/js/_tabs.js",
        "./src/js/_radial.js",
        "./src/js/_carousel.js",
        "./src/js/_positioning.js",
        "./src/js/_transitions.js",
        "./src/js/_validation.js" 
      ]
    }),
    new ConcatPlugin({
      uglify: {
      compress: false,
      mangle: false,
      output: {
        beautify: true,
        comments: "basic"
      },
    },
      fileName: 'js/webui-basic.js',
      filesToConcat: ["./src/js/main.js"]
    }),
    new ConcatPlugin({
      uglify: {
      compress: false,
      mangle: false,
      output: {
        beautify: true,
        comments: "basic grid"
      },
    },
      fileName: 'js/webui-basic-grid.js',
      filesToConcat: ["./src/js/main.js"]
    }),
    new ConcatPlugin({
      uglify: {
      compress: false,
      mangle: false,
      output: {
        beautify: true,
        comments: "basic flexbox"
      },
    },
      fileName: 'js/webui-basic-flexbox.js',
      filesToConcat: ["./src/js/main.js"]
    }),
    new ConcatPlugin({
      uglify: {
      compress: false,
      mangle: false,
      output: {
        beautify: true,
        comments: "utils"
      },
    },
      fileName: 'js/webui-utils.js',
      filesToConcat: ["./src/js/utils.js"]
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
    filename: 'js/[name].js',
  },
  watch: true,
};

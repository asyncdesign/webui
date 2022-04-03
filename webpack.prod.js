//process.traceDeprecation = true;

const path = require('path');
const terser = require('terser');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackConcatPlugin = require('webpack-concat-files-plugin');
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
  performance: {
    hints: false
  },
  plugins: [
    new WebpackConcatPlugin({
      bundles: [
        {
          dest: './dist/js/webui-components.min.js',
          src: './src/js/*.js',
          /*
          src: ["./src/js/main.js", 
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
            "./src/js/_validation.js"]
          */
          transforms: {
            after: async (code) => {
              const minifiedCode = await terser.minify(code);
              return minifiedCode.code;
            }
          }

        }]
    }),
    new WebpackConcatPlugin({
      bundles: [
        {
          dest: './dist/js/webui.min.js',
          src: './src/js/main.js',
          transforms: {
            after: async (code) => {
              const minifiedCode = await terser.minify(code);
              return minifiedCode.code;
            }
          }
        }]
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].min.css"
    }),
    new RemovePlugin({
      after: {
        root: path.resolve(__dirname, 'dist'),
        include: [
          'js/webui-all.min.js', 
          'js/webui-standard.min.js', 
          'js/webui-basic.min.js',
          'js/webui-components-all.min.js', 
          'js/webui-components-standard.min.js', 
          'js/webui-components-basic.min.js'
        ],
        log: false
      }
    }),
    new WebpackMessages({
      name: 'production',
      logger: str => console.log(`\n> ${str}\n`)
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
    filename: 'js/[name].min.js'
  },
  mode: 'production',
  stats: {
    all: false,
    warnings: false,
    errors: false,
    errorDetails: false,
    modules: false,
    moduleTrace: false
  }
};

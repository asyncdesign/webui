//process.traceDeprecation = true;

const path = require('path');
const terser = require('terser');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackConcatPlugin = require('webpack-concat-files-plugin');
const RemoveFilesPlugin = require('remove-files-webpack-plugin');
const WebpackMessages = require('webpack-messages');

module.exports = {

  entry: {'webui-components-all': ['./src/scss/webui-components-all.scss'],
          'webui-components-standard': ['./src/scss/webui-components-standard.scss'],
          'webui-components-basic': ['./src/scss/webui-components-basic.scss'],
          'webui-all': ['./src/scss/webui-all.scss'],         
          'webui-standard': ['./src/scss/webui-standard.scss'],
          'webui-basic': ['./src/scss/webui-basic.scss']
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
          src: ['./src/js/main.js', './src/js/_settings.js'],
          transforms: {
            after: async (code) => {
              const minifiedCode = await terser.minify(code);
              return minifiedCode.code;
            }
          }
        }]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css'
    }),
    new RemoveFilesPlugin({
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
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: false
            }
          },
          'sass-loader'
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

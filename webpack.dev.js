//process.traceDeprecation = true;

const path = require('path');
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
          dest: './dist/js/webui-components.js',
          src: './src/js/*.js'       
      }]
    }),
    new WebpackConcatPlugin({
      bundles: [
        {
          dest: './dist/js/webui.js',
          src: ['./src/js/main.js', './src/js/_settings.js']
        }]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new RemoveFilesPlugin({
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
  watch: false
};

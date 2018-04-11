const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'build')
  },

  module: {
    rules: [
      /**
       *  CSS Files for the website have to be concatenated and minimized
       * into a single style.css file
       */
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        })
      },

      /**
       * Images should be compressed and afterwards
       * stored inside the img folder
       */
      {
        test: /\.(gif|png|jpe?g|ico|webm)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },

      /**
       * Fonts are stored inside the font folder
       */
      {
        test: /\.(woff2|woff|otf|ttf)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('style.css'),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/html/index.html',
      inject: 'body'
    }),

    /**
     * Just copy the SPAYLE game without any processing
     */
    new CopyWebpackPlugin([
      { from: 'src/game/', to: 'game/' }
    ]),

    new UglifyJsPlugin(),

    new CopyWebpackPlugin([{ from: 'src/html/', to: './' }])
  ],

  mode: 'development'
};

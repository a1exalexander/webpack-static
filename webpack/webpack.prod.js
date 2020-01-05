const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ImageminPlugin = require('imagemin-webpack');
const postcssPresetEnv = require('postcss-preset-env');
const helpers = require('./webpack.helpers');
// Uncomment bot line to use JS import CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  module: {
    rules: [
      // Uncomment bot line to use JS import CSS
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [postcssPresetEnv()]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          helpers.useFileLoaderImage(),
          {
            loader: ImageminPlugin.loader,
            options: {
              bail: false,
              cache: true,
              imageminOptions: {
                plugins: [
                  ['gifsicle', { interlaced: true }],
                  ['jpegtran', { progressive: true }],
                  ['optipng', { optimizationLevel: 5 }],
                  [
                    'svgo',
                    {
                      plugins: [
                        {
                          removeViewBox: false
                        }
                      ]
                    }
                  ]
                ]
              }
            }
          }
        ]
      }
    ]
  },
  // Uncomment bot line to use JS import CSS
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.[hash].css'
    })
  ]
});

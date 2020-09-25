const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const helpers = require('./webpack.helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const EventHooksPlugin = require('event-hooks-webpack-plugin');
const rimraf = require('rimraf');

module.exports = {
  entry: helpers.getEntry(),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
    filename: helpers.getOutputFilename(),
  },
  devServer: {
    port: 1234,
    overlay: true,
    inline: true,
    compress: false,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/css',
              outputPath: 'css',
              name(resourcePath) {
                if (/font/.test(resourcePath)) {
                  return '[name].css';
                }
                return '[name].[hash].css';
              },
              esModule: false,
            },
          },
          'extract-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [postcssPresetEnv()],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              attrs: ['img:src', 'img:data-src', 'link:href'],
            },
          },
        ],
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: true,
              esModule: false,
              attrs: ['img:src', 'img:data-src', 'link:href'],
            },
          },
          {
            loader: 'posthtml-loader',
            options: {
              plugins: [
                require('posthtml-include')({
                  root: './src',
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(webmanifest|xml|ico|txt)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'public',
              publicPath: '/public',
              name: '[name].[ext]',
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/assets/fonts/',
              outputPath: 'assets/fonts/',
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: true,
    }),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, helpers.src.STATIC), to: '../dist/static' },
    ]),
    new EventHooksPlugin({
      done: () => {
        const staticFolder = path.resolve(__dirname, '../dist/static');
        fs.readdir(staticFolder, (err, files) => {
          const count = files.reduce((prev, acc) => {
            if (acc === '.gitkeep') return prev;
            return prev + 1;
          }, 0);
          if (!count) rimraf.sync(staticFolder);
        });
      },
    }),
  ],
};

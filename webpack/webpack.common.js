const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const helpers = require('./webpack.helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: helpers.getEntry(),
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name]',
  },
  devServer: {
    port: 1234,
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        use: [

          {
            loader: "handlebars-template-loader",
            query: {
              parseDynamicRoutes: true,
              attributes: ['img:src', 'x-img:src', 'link:href']
            }
          },
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"]
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: true,
              esModule: false,
              attrs: ['img:src', 'img:data-src', 'link:href']
            }
          }
        ]
      },
      {
        test: /\.(webmanifest|xml|ico|txt)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'public',
              name: '[name].[ext]',
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/fonts',
              name: '[name].[ext]',
              esModule: false
            }
          }
        ]
      },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         outputPath: 'css',
      //         name: '[name].css',
      //         esModule: false
      //       }
      //     },
      //     'extract-loader',
      //     'css-loader',
      //     'sass-loader',
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         ident: 'postcss',
      //         plugins: () => [postcssPresetEnv()]
      //       }
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: path.join(__dirname, helpers.src.STATIC), to: 'public' }]),
    ...helpers.templatePlugin(),
  ]
};

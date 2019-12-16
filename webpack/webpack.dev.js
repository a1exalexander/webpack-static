const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      // Uncomment bot line to use JS import CSS
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'sass-loader',
      //   ],
      // },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          helpers.useFileLoaderImage(),
        ]
      },
    ]
  }
});

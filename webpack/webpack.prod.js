const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ImageminPlugin = require('imagemin-webpack');
const postcssPresetEnv = require('postcss-preset-env');
const helpers = require('./webpack.helpers');

module.exports = (env) => {
  console.log(env)
  return merge(common, {
    mode: 'production',
    devtool: 'hidden-source-map',
    module: {
      rules: [
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
                            removeViewBox: false,
                          },
                        ],
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [...helpers.templatePlugin({ minify: { collapseWhitespace: true } })],
  });
};

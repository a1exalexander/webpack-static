const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const path = require('path');

const devMode = () => process.env.NODE_ENV !== 'production';

const ROOT = `../src`;

const src = {
  JS: `${ROOT}/js`,
  SCRIPTS: `${ROOT}/scripts`,
  PAGES: `${ROOT}`,
  ASSETS: `${ROOT}/assets`,
  PUBLIC: `${ROOT}/public`,
  SCSS: `${ROOT}/scss`,
  STATIC: `${ROOT}/static`,
  COMPONENTS: `${ROOT}/components`,
};

const TEMPLATE_TYPES = ['html', 'pug'];

const useFileLoaderImage = () => {
  return {
    loader: 'file-loader',
    options: {
      publicPath: '/assets/images/',
      outputPath: 'assets/images/',
      name: '[name].[ext]',
      esModule: false,
    },
  };
};

const templatePlugin = ({ minify }) => {
  let hasExtension = [];
  const res = fs
    .readdirSync(path.resolve(__dirname, src.PAGES))
    .filter((item) => {
      const parts = item.split('.');
      const extension = String(parts.slice(-1));
      return TEMPLATE_TYPES.some((item) => {
        const isExtension = item === extension;
        if (isExtension) hasExtension.push(extension);
        return isExtension;
      });
    })
    .map((item) => {
      const parts = item.split('.');
      const name = `${parts[0]}${parts[2] ? '.' + parts[1] : ''}`;
      const extension = String(parts.slice(-1));

      return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        inject: false,
        template: path.resolve(__dirname, src.PAGES, `${name}.${extension}`),
        minify,
      });
    });
  return res;
};

const getEntry = () => {
  let entry = {};
  fs.readdirSync(path.resolve(__dirname, src.JS)).forEach((file) => {
    if (file.match(/.*\.js$/)) {
      const parts = file.split('.');
      const name = `${parts[0]}${parts[2] ? '.' + parts[1] : ''}`;
      entry[name] = path.resolve(__dirname, src.JS, file);
    }
  });
  if (Object.keys(entry).length === 0) {
    fs.readdirSync(path.resolve(__dirname, src.PAGES)).forEach((file) => {
      if (file.match(/.*\.(html|pug)$/)) {
        const parts = file.split('.');
        const name = `${parts[0]}${parts[2] ? '.' + parts[1] : ''}`;
        entry[name] = path.resolve(__dirname, src.PAGES, file);
      }
    });
  }
  return entry;
};

const getOutputFilename = () => {
  let filename = '[name].html';
  fs.readdirSync(path.resolve(__dirname, src.JS)).forEach((file) => {
    if (file.match(/.*\.js$/)) {
      filename = 'js/[name].js';
    }
  });
  return filename;
};

const copyPlugin = () => {
  return new CopyWebpackPlugin([{ from: path.resolve(__dirname, src.PUBLIC), to: 'public' }]);
};

module.exports = {
  devMode,
  ROOT,
  copyPlugin,
  templatePlugin,
  useFileLoaderImage,
  getEntry,
  src,
  getOutputFilename,
};

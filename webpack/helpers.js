const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const fs = require("fs");
const path = require("path");

const ROOT = `../src`;

const src = {
  JS: `${ROOT}/js`,
  SCRIPTS: `${ROOT}/scripts`,
  PAGES: `${ROOT}`,
  ASSETS: `${ROOT}/assets`,
  PUBLIC: `${ROOT}/public`,
  STATIC: `${ROOT}/static`,
};

const TEMPLATE_TYPES = ["html", "pug", "ejs", "hbs"];

const useFileLoaderImage = () => {
  return {
    loader: "file-loader",
    options: {
      outputPath: (url, resourcePath, context) => {
        if (/public/.test(context)) {
          return `public/${url}`;
        }
        return `assets/images/${url}`;
      },
      name(file) {
        if (process.env.NODE_ENV === 'development') {
          return '[name].[ext]';
        }
        return '[contenthash].[ext]';
      },
      esModule: false
    }
  };
};

const templatePlugin = () => {
  return fs
    .readdirSync(path.join(__dirname, src.PAGES))
    .filter(item => {
      const parts = item.split(".");
      const extension = String(parts.slice(-1));
      return TEMPLATE_TYPES.some(item => item === extension);
    })
    .map(item => {
      const parts = item.split(".");
      const name = `${parts[0]}${parts[2] ? "." + parts[1] : ""}`;
      const extension = String(parts.slice(-1));

      return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        inject: false,
        template: path.join(__dirname, src.PAGES, `${name}.${extension}`),
        minify: {
          collapseWhitespace: true
        }
      });
    });
};

const getEntry = () => {
  let entry = {};
  fs.readdirSync(path.join(__dirname, src.JS)).forEach((file) => {
    if (file.match(/.*\.js$/)) {
      const parts = file.split(".");
      const name = `${parts[0]}${parts[2] ? "." + parts[1] : ""}`;
      entry[`js/${name}.js`] = path.join(__dirname, src.JS, file);
    }
  });
  fs.readdirSync(path.join(__dirname, ROOT)).forEach((file) => {
    if (file.match(/.*\.html$/)) {
      const parts = file.split(".");
      const name = `${parts[0]}${parts[2] ? "." + parts[1] : ""}`;
      entry[`${name}.html`] = path.join(__dirname, ROOT, file);
    }
  });
  return entry;
}

const copyPlugin = () => {
  return new CopyWebpackPlugin([
    { from: path.join(__dirname, src.PUBLIC), to: "public" }
  ])
}

module.exports = { copyPlugin, templatePlugin, useFileLoaderImage, getEntry, src };
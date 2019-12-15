# Webpack config for pure static pages (Landing pages)

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.

- **template**: HTML, PUG
- **styles**: CSS, SCSS

## Installation

```bash
npm install 
```

## Usage

#### Dev server
```bash
npm start 
```
or
```bash
npm run dev 
```
> Runs the app in the development mode.<br />
> Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
> 
> The page will reload if you make edits.<br />
> You will also see any lint errors in the console.

#### Build
```bash
npm run build 
```

> Builds the app for production to the `dist` folder.<br />
> It correctly bundles in production mode and optimizes the build for the best performance.
>
> The build is minified and the filenames include the hashes.<br />
> Your app is ready to be deployed!

#### Check HTML

```bash
npm run validate 
```

> Run w3c validator


### Directory layout

    .
    ├── dist                   # Compiled files
    ├── src                    # Source files
      ├── assets               # Assets (Images/fonts/svg/...)
        ├── fonts
        ├── images
        ├── svg
      ├── js                   # Entry JS files
        ├── source             # Source for JS entries (modules/services/data/libraries)
      ├── public               # Favicons, webmanifest and other
      ├── scss
      ├── static               # sitemap, robots adn other
    ├── webpack                # Webpack config
    ├── .htmlvalidate.json     # w3c validator config
    ├── .prettierrc            # Prettier config
    ├── .editorconfig          # Editor config
    ├── .gitignore             # Git ignore rules
    └── README.md

'use strict'

const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = _path => {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = options => {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    const sourceLoader = loaders.map(function (loader) {
      let extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    if (options.extract) {
      return ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: sourceLoader
      })
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = options => {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}


//Genrate loaders for some js files (only for vue-bulma*), just a hack way
//todo why my __dirname is not work?

exports.loaders = function(options){
  var loaders = exports.styleLoaders(options);
  var current_dir = path.resolve();
  loaders.push({
    test: /.js?$/,
    include: [
      path.resolve(current_dir, "node_modules/.0.0.1@vue-bulma-jump/src"),
      path.resolve(current_dir, "node_modules/.0.0.1@vue-bulma-emoji/src"),
      path.resolve(current_dir, "node_modules/.0.0.1@vue-bulma-progress-tracker/src")
    ],
    loader: 'babel'
  });
  return loaders;
}

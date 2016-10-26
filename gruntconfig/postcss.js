'use strict';

var autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    calc = require('postcss-calc'),
    postcssImport = require('postcss-import'),
    precss = require('precss');


var config = require('./config');


var postcss = {

  build: {
    options: {
      map: true,
      processors: [
        postcssImport({
          path: config.cssPath
        }),
        precss(),
        calc(),
        autoprefixer({'browsers': 'last 3 versions'})
      ]
    },
    cwd: config.src + '/htdocs',
    dest: config.build + '/' + config.src + '/htdocs',
    expand: true,
    ext: '.css',
    extDot: 'last',
    src: [
      'css/*.scss',
      '!css/_*.scss'
    ]
  },

  dist: {
    options: {
      processors: [
        cssnano({
          autoprefixer: false,
          zindex: false
        })
      ]
    },
    cwd: config.build + '/' + config.src + '/htdocs',
    dest: config.dist + '/htdocs',
    expand: true,
    src: [
      '**/*.css'
    ]
  }

};

module.exports = postcss;

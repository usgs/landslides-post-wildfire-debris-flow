'use strict';


var config = require('./config');


var watch = {

  gruntfile: {
    files: [
      'Gruntfile.js',
      'gruntconfig/**/*.js'
    ],
    tasks: [
      'eslint:gruntfile'
    ]
  },

  livereload: {
    options: {
      livereload: config.liveReloadPort
    },
    files: [
      config.build + '/' + config.src + '/**/*'
    ]
  },

  scripts: {
    files: [config.src + '/htdocs/**/*.js'],
    tasks: [
      'eslint:scripts',
      'browserify',
      'mocha_phantomjs'
    ]
  },

  scss: {
    files: [config.src + '/htdocs/**/*.scss'],
    tasks: [
      'postcss:build'
    ]
  },

  static: {
    files: [
      config.src + '/**/*',
      '!**/*.js',
      '!**/*.scss',
      '!**/*.orig'
    ],
    tasks: [
      'copy:build'
    ]
  },

  tests: {
    files: [
      config.test + '/*.html',
      config.test + '/**/*.js'
    ],
    tasks: [
      'eslint:tests',
      'copy:test',
      'browserify:test',
      'mocha_phantomjs'
    ]
  }

};


module.exports = watch;

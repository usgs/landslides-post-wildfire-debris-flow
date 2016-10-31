'use strict';

var config = require('./config');


var eslint = {
  options: {
    config: '.eslintrc.json'
  },
  gruntfile: [
    'Gruntfile.js',
    'gruntconfig/**/*.js'
  ],
  scripts: [
    config.src + '/htdocs/**/*.js'
  ],
  tests: [
    config.test + '/**/*.js'
  ]
};


module.exports = eslint;

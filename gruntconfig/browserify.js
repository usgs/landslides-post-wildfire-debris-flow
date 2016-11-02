'use strict';


var babelify = require('babelify'),
    config = require('./config'),
    glob = require('glob');


var BUNDLE_CLASSES,
    JS;

JS = './' + config.src + '/htdocs/js';

BUNDLE_CLASSES = [
  JS + '/summary/SummaryFireLayer.js:summary/SummaryFireLayer',
  JS + '/summary/SummaryMapView.js:summary/SummaryMapView',
  JS + '/summary/SummaryView.js:summary/SummaryView',
  JS + '/detail/DetailDownloadView.js:detail/DetailDownloadView',
  JS + '/detail/DetailMapView.js:detail/DetailMapView',
  JS + '/detail/DetailView.js:detail/DetailView'
];


Object.keys(config.jsPath).forEach(function (path) {
  var files,
      pattern;

  pattern = config.jsPath[path];
  if (pattern) {
    path = path + '/';
    files = glob.sync(path + pattern);
    files.forEach(function (file) {
      var alias;
      alias = file.replace(path, '').replace('.js', '');
      BUNDLE_CLASSES.push('./' + file + ':' + alias);
    });
  }
});


var browserify = {

  options: {
    browserifyOptions: {
      debug: true,
      paths: Object.keys(config.jsPath)
    },
    transform: [
      babelify.configure({
        presets: ['es2015']
      })
    ]
  },


  'bundle': {
    src: [],
    dest: config.build + '/' + config.src + '/htdocs/js/bundle.js',
    options: {
      alias: BUNDLE_CLASSES
    }
  },

  'entrypoints': {
    expand: true,
    cwd: './' + config.src + '/htdocs/js',
    dest: './' + config.build + '/' + config.src + '/htdocs/js',
    src: [
      '*.js'
    ],
    options: {
    }
  },

  'test': {
    src: config.test + '/test.js',
    dest: config.build + '/' + config.test + '/test.js',
    options: {
      external: BUNDLE_CLASSES
    }
  }

};


module.exports = browserify;

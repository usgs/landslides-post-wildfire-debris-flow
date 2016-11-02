# landslides-post-wildfire-debris-flow

[![Build Status](https://travis-ci.org/usgs/landslides-post-wildfire-debris-flow.svg?branch=master)](https://travis-ci.org/usgs/landslides-post-wildfire-debris-flow)
[![codecov](https://codecov.io/gh/usgs/landslides-post-wildfire-debris-flow/branch/master/graph/badge.svg)](https://codecov.io/gh/usgs/landslides-post-wildfire-debris-flow)


A web application that displays estimates for the probability and volume of
debris flows that may be produced by a storm in a recently burned area.


Generating a new Project
------------------------

- Use git to clone landslides-post-wildfire-debris-flow from git repository
- Install php

  ```bash
  $ brew install php56 --with-pdo-pgsql
  ```

Using the Generated Project
---------------------------
To begin working with the project

## Getting Started
- run `npm install` to install application development dependencies
- configure the application
- run `grunt` from the install directory

## Configuration
- run `src/lib/pre-install` to setup config.ini
- configuration options are defined in `src/lib/configure.inc.php`
- `MOUNT_PATH` is the base url for the application

## CSS
- SCSS files (`*.scss`, `!_*.scss`) in the `src/htdocs/css` directory are compiled.
- Path is configured in `gruntconfig/config.js`:

  ```
  cssPath: [
    'src/htdocs/css',
    'node_modules/hazdev-webutils/src'
  ]
  ```

## JS
- JS files (`*.js`) in the `src/htdocs/js` directory are compiled.
- Path is configured in `gruntconfig/config.js`:

  ```
  jsPath: {
    // DIRECTORY: EXPORT_PATTERN,

    # export all files in these directories in htdocs/js/bundle.js
    # for use in testing
    'src/htdocs/js': '*/*.js',
    'node_modules/hazdev-webutils/src': '**/*.js',

    # add to path, but don't export
    'node_modules/other-module/dist': null
  }
  ```

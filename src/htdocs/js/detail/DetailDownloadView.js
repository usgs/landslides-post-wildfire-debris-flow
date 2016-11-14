'use strict';


var Util = require('util/Util'),
    View = require('mvc/View');


var _DEFAULTS;

_DEFAULTS = {};


/**
 * Creates a list of downloads at the bottom of the DownloadView
 *
 */
var DetailDownloadView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = View(options);

  /**
   * Constructor for this view.
   *
   * @param options {Object}
   *     Configuration options for this view.
   */
  _initialize = function (options) {
    _this.data = options.data || {};
  };

  /**
   * Destroy all the things.
   *
   */
  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return;
    }

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Makes an ajax request to ArcGIS web service to request all
   * geodatabase/shape files for the wildfire event.
   *
   * @return {Array}
   *         An array of downloads to display in a list
   */
  _this.getDownloads = function () {
    return 'TODO';
  };

  /**
   * TODO display actual downloads from feed
   *
   */
  _this.render = function () {
    var markup;

    markup =
      '<h3>Downloads</h3>' +
      '<p>' +
        'Below are the shapefiles and geodatabase information that was ' +
        'used in the creation of the maps on this page.' +
      '</p>' +
      '<ul>' +
        '<li>' +
          '<a href="#TODO">Geodatabase (.gdb)</a>' +
        '</li>' +
        '<li>' +
          '<a href="#TODO">Shapefile (.shp)</a>' +
        '</li>' +
        '<li>' +
          '<a href="#TODO">README (.txt)</a>' +
        '</li>' +
      '</ul>';


    _this.el.innerHTML = markup;
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = DetailDownloadView;

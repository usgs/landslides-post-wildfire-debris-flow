'use strict';


var Util = require('util/Util'),
    View = require('mvc/View');


var _DEFAULTS;

_DEFAULTS = {};


/**
 * Creates a leaflet map for the DetailView
 *
 */
var DetailMapView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = View(options);

  /**w
   * Constructor for this view.
   *
   * @param options {Object}
   *     Configuration options for this view.
   */
  _initialize = function () {
    _this.el.classList.add('detail-map-view');
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

  _this.render = function () {
    _this.el.innerHTML = '<p>TODO, Create Detail Map View</p>';
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = DetailMapView;

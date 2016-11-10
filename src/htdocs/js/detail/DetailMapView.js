/* global L */
'use strict';


var DetailFireLayer = require('detail/DetailFireLayer'),
    Terrain = require('leaflet/layer/Terrain'),
    Util = require('util/Util');


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
  _this = {};

  /**w
   * Constructor for this view.
   *
   * @param options {Object}
   *     Configuration options for this view.
   */
  _initialize = function (options) {
    // get element to append map 
    _this.el = options.el || document.createElement('div');

    // summary data from wildfire
    _this.summary = options.summary || {};


    _this.map = L.map(_this.el, {
      center: [41.5, -112.0],
      maxBounds: [
        [-90, -Infinity],
        [90, Infinity]
      ],
      zoom: 5,
      zoomAnimation: false
    });

    // Add basemap
    Terrain().addTo(_this.map);

    // Add fire overlay layers
    _this.fires = DetailFireLayer({
      data: _this.summary
    });

    // Add Map Controls
    if (!Util.isMobile()) {
      _this.map.addControl(L.control.scale({position: 'bottomleft'}));
    }
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
   * Makes an ajax request to ArcGIS web service to request all layers for
   * the wildfire event.
   *
   * @return {Array}
   *         An array of layers to display on a leaflet map
   */
  _this.getLayers = function () {
    return 'TODO';
  };

  _this.render = function () {
    _this.el.innerHTML = 'TODO, Create Detail Map View';
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = DetailMapView;
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
    var lat,
        lon,
        zoom;

    // defaults
    lat = 41.5;
    lon = -112.0;
    zoom = 5;

    // get element to append map
    _this.el = options.el || document.createElement('div');
    _this.mapEl = _this.el.querySelector('.detail-map') ||
        document.createElement('div');
    _this.legendEl = _this.el.querySelector('.legend') ||
        document.createElement('div');

    // summary data from wildfire
    _this.data = options.data || {};
    _this.url = options.url || '';

    // set map coordinates
    if (typeof _this.data.lat !== 'undefined' && _this.data.lat !== null &&
        typeof _this.data.lon !== 'undefined' && _this.data.lon !== null) {
      lat = _this.data.lat;
      lon = _this.data.lon;
    }

    // set zoom level on map
    if (typeof _this.data.size !== 'undefined' && _this.data.size !== null) {
      zoom = _this.getZoomLevel(_this.data.size);
    }

    _this.map = L.map(_this.mapEl, {
      'center': [lat, lon],
      'maxBounds': [
        [-90, -Infinity],
        [90, Infinity]
      ],
      'scrollWheelZoom': false,
      'zoom': zoom,
      'zoomAnimation': false
    });

    // Add basemap
    Terrain().addTo(_this.map);

    // Add fire overlay layers
    _this.fire = DetailFireLayer({
      data: _this.data,
      legendEl: _this.legendEl,
      url: _this.url
    });
    _this.map.addLayer(_this.fire);

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
   * Based on the size of the fire a zoom level is returned
   *
   * @param size {Number}
   *        Total area burned in km^2
   *
   * @return {Number}
   *        Zoom level
   */
  _this.getZoomLevel = function (size) {
    // if size is not defined, zoom to 11
    if (size === null || typeof size === 'undefined') {
      return 11;
    }

    if (size < 10) {
      return 13;
    } else if (size < 75) {
      return 12;
    } else if (size < 300) {
      return 11;
    } else if (size < 900) {
      return 10;
    }

    return 9;
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = DetailMapView;

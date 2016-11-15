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

    // summary data from wildfire
    _this.data = options.data || {};

    // get map coordinates and zoom level
    if (_this.data.attributes && _this.data.attributes.size &&
        _this.data.attributes.lat && _this.data.attributes.lon) {
      lat = _this.data.attributes.lat;
      lon = _this.data.attributes.lon;
      zoom = _this.getZoomLevel(_this.data.attributes.size);
    }

    _this.map = L.map(_this.el, {
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
    _this.fires = DetailFireLayer({
      data: _this.data
    });
    _this.map.addLayer(_this.fires);

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
    if (!size) {
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
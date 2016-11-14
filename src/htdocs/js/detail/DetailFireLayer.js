'use strict';

var HazDevLayers = require('leaflet/control/HazDevLayers'),
    Util = require('util/Util');

var _DEFAULTS = {};


/**
 * A leaflet layer that displays fire overlays with a layer control
 * that allows the user to select which overlay to display.
 *
 * @param options {Object}
 *        - options.overlays {Array} array of fire overlay ids
 */
var DetailFireLayer = function (options) {
  var _this,
      _initialize;


  _this = {};

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _this.data = options.data.attributes || {};
    _this.overlays = _this.data.layers || [];
    _this.layers = HazDevLayers();

    _this.map = null;
  };

  /**
   * Add fire overlays to the map.
   *
   * Loops through _this.overlays and creates a separate layer group
   * for each overlay.
   *
   */
  _this.addOverlays = function () {
    // Add layer group to map
    _this.layers.addTo(_this.map);
  };

  /**
   * Gets overlays based on layer id
   *
   * @param id {Number}
   *        The layer id that corresponds to a fire overlay
   *
   * @return {Object}
   *        An overlay baselayer
   */
  _this.getOverlay = function () {
    return 'TODO';
  };

  /**
   * Destroy all the things.
   *
   */
  _this.destroy = function () {
    if (_this === null) {
      return;
    }

    _initialize = null;
    _this = null;
  };

  /**
   * Leaflet ILayer API method.
   *
   * Called when layer is added to map.
   */
  _this.onAdd = function (map) {
    _this.map = map;
    _this.addOverlays();
  };

  /**
   * Leaflet ILayer API method.
   *
   * Called when layer is removed from map.
   */
  _this.onRemove = function () {
    _this.map = null;
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = DetailFireLayer;
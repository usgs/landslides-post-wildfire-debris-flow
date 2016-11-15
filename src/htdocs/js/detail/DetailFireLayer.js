/* global L */
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
    var comboBasins,
        comboSegments,
        probBasins,
        probSegments,
        volumeBasins,
        volumeSegments,
        ws,
        year;

    // need year to build web service URI
    if (!_this.data.date) {
      return;
    }

    year = new Date(_this.data.date).getFullYear();
    ws = 'http://dev01-gis01.cr.usgs.gov/arcgis/services/ls/pwfdf_' + year +
        '/MapServer/WMSServer';

    probBasins = L.tileLayer.wms(ws, {
      layers: '2,7,8',
      format: 'image/png',
      transparent: true,
      opacity: 0.65,
      attribution: 'USGS'
    });

    probSegments = L.tileLayer.wms(ws, {
      layers: '5,7,6,8',
      format: 'image/png',
      transparent: true,
      opacity: 0.65,
      attribution: 'USGS'
    });

    volumeBasins = L.tileLayer.wms(ws, {
      layers: '1,7,8',
      format: 'image/png',
      transparent: true,
      opacity: 0.65,
      attribution: 'USGS'
    });

    volumeSegments = L.tileLayer.wms(ws, {
      layers: '4,7,6,8',
      format: 'image/png',
      transparent: true,
      opacity: 0.65,
      attribution: 'USGS'
    });

    comboBasins = L.tileLayer.wms(ws, {
      layers: '0,7,8',
      format: 'image/png',
      transparent: true,
      opacity: 0.65,
      attribution: 'USGS'
    });

    comboSegments = L.tileLayer.wms(ws, {
      layers: '3,7,6,8',
      format: 'image/png',
      transparent: true,
      opacity: 0.65,
      attribution: 'USGS'
    });

    // add all layers to the layer group
    _this.layers.addBaseLayer(probBasins, 'Basin Probability');
    _this.layers.addBaseLayer(probSegments, 'Segment Probability');
    _this.layers.addBaseLayer(volumeBasins, 'Basin Volume');
    _this.layers.addBaseLayer(volumeSegments, 'Segment Volume');
    _this.layers.addBaseLayer(comboBasins, 'Basin Hazard');
    _this.layers.addBaseLayer(comboSegments, 'Segment Hazard');

    // Add layer group to map
    _this.layers.addTo(_this.map);
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
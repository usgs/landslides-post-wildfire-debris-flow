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


  options = Util.extend({}, _DEFAULTS, options);
  _this = {};

  _initialize = function (options) {
    _this.data = options.data || {};
    _this.layers = HazDevLayers();
    _this.legendEl = options.legendEl || document.createElement('img');
    _this.url = options.url;

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
        volumeSegments;

    probBasins = L.tileLayer.wms(_this.url, {
      layers: '2,7,8',
      format: 'image/png',
      transparent: true,
      opacity: 0.65,
      attribution: 'USGS'
    });

    probSegments = L.tileLayer.wms(_this.url, {
      layers: '5,7,6,8,9',
      format: 'image/png',
      transparent: true,
      opacity: 0.65,
      attribution: 'USGS'
    });

    volumeBasins = L.tileLayer.wms(_this.url, {
      layers: '1,7,8',
      format: 'image/png',
      transparent: true,
      opacity: 0.65,
      attribution: 'USGS'
    });

    volumeSegments = L.tileLayer.wms(_this.url, {
      layers: '4,7,6,8,9',
      format: 'image/png',
      transparent: true,
      opacity: 0.65,
      attribution: 'USGS'
    });

    comboBasins = L.tileLayer.wms(_this.url, {
      layers: '0,7,8',
      format: 'image/png',
      transparent: true,
      opacity: 0.65,
      attribution: 'USGS'
    });

    comboSegments = L.tileLayer.wms(_this.url, {
      layers: '3,7,6,8,9',
      format: 'image/png',
      transparent: true,
      opacity: 0.65,
      attribution: 'USGS'
    });

    probBasins.legendUrl = '../../images/Probability_Legend_Basins2016.png';
    probSegments.legendUrl = '../../images/Probability_Legend_Segments2016.png';
    volumeBasins.legendUrl = '../../images/Volume_Legend_Basins2016.png';
    volumeSegments.legendUrl = '../../images/Volume_Legend_Segments2016.png';
    comboBasins.legendUrl = '../../images/Combined_Legend_basins2016.png';
    comboSegments.legendUrl = '../../images/Combined_Legend_Segments2016.png';

    // add all layers to the layer group
    _this.layers.addBaseLayer(probBasins, 'Basin Probability');
    _this.layers.addBaseLayer(probSegments, 'Segment Probability');
    _this.layers.addBaseLayer(volumeBasins, 'Basin Volume');
    _this.layers.addBaseLayer(volumeSegments, 'Segment Volume');
    _this.layers.addBaseLayer(comboBasins, 'Basin Hazard');
    _this.layers.addBaseLayer(comboSegments, 'Segment Hazard');


    // Show "Segment Probability" by default
    probBasins.addTo(_this.map);
    _this.legendEl.src = probBasins.legendUrl;

    // Add layer group to map
    _this.layers.addTo(_this.map);

    _this.map.on('baselayerchange', function (changeEvent) {
      _this.legendEl.src = changeEvent.layer.legendUrl;
    });
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

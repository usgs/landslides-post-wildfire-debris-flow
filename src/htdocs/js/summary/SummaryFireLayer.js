/* global L */
'use strict';

var HazDevLayers = require('leaflet/control/HazDevLayers'),
    Util = require('util/Util');


var _DEFAULTS = {


};


var SummaryFireLayer = function (options) {
  var _this,
      _initialize;


  _this = {};

  _initialize = function (options) {
    options = Util.extend({}, _DEFAULTS, options);

    _this.data = options.data || {};
    _this.el = options.el || document.createElement('div');
    _this.map = null;

    _this.fireIcon = L.icon({
      iconUrl: 'images/flame.png',
      iconRetinaUrl: 'my-icon@2x.png',
      iconSize: [15, 20],
      iconAnchor: [10, 18],
      popupAnchor: [-3, -16]
    });

    _this.markers = _this.getMarkers(_this.data);
  };

  /**
   * add fire markers to the map.
   *
   * @param fire {Object}
   *     fire object.
   * @param latLng {Object}
   *     normalized latitude/longitude for object.
   * @return {DOMElement}
   *     marker element, positioned and styled.
   */
  _this.addMarkers = function () {
    HazDevLayers(_this.markers).addTo(_this.map);
  };

  /**
   * Format _this.data into object containing array of markers to plot on map
   * @return {[type]} [description]
   */
  _this.getMarkers = function () {
    var data,
        fire,
        fires,
        marker,
        markers,
        year,
        years;

    fires = {};
    years = Object.keys(_this.data);
    years = years.sort(function (a,b) { return b - a; });

    for (var x = 0; x < years.length; x++) {
      year = years[x];
      data = _this.data[year];
      markers = [];

      // loop through entire year of fires
      for (var i = 0; i < data.length; i++) {
        fire = data[i];
        marker = L.marker([
          fire.attributes.lat,
          fire.attributes.lon,
        ], {
          title: fire.attributes.fire,
          icon: _this.fireIcon
        });

        marker.bindPopup(
            '<a href="detail.php?id=' + fire.attributes.objectid + '">' +
              '<h3>' + fire.attributes.fire + '</h3>' +
            '</a>');
        markers.push(marker);
      }

      fires[year] = L.layerGroup(markers);
    }

    return fires;
  };

  /**
   * Leaflet ILayer API method.
   *
   * Called when layer is added to map.
   */
  _this.onAdd = function (map) {
    _this.map = map;
    _this.addMarkers();
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


module.exports = SummaryFireLayer;
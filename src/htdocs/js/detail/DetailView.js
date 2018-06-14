'use strict';


var DetailMapView = require('detail/DetailMapView'),
    Util = require('util/Util'),
    Xhr = require('util/Xhr');


var _DEFAULTS;

_DEFAULTS = {};


/**
 * Creates layout for the detail view.
 *
 */
var DetailView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = {};

  /**
   * Constructor for this view.
   *
   * @param options {Object}
   *     Configuration options for this view.
   */
  _initialize = function (options) {
    var titleEl,
        year;

    // set _this.el element
    _this.el = options.el || document.createElement('div');
    _this.data = _this.getData(options.data);

    if (_this.data === {}) {
      _this.el.innerHTML = '<p class="alert error">No Data to load.</p>';
      return;
    }

    _this.el.classList.add('detail-view');
    _this.el.innerHTML =
        '<div class="detail-summary"></div>' +
        '<h2>Preliminary Hazard Assessment</h2>' +
        '<div class="detail-map-view">' +
          '<div class="detail-map"></div>' +
          '<img src="" class="legend" />' +
        '</div>' +
        '<div class="detail-description"></div>' +
        '<div class="detail-download"></div>';

    // Update page title
    titleEl = document.querySelector('.page-header > h1');
    if (titleEl) {
      titleEl.innerHTML = _this.getAttribute('fire') + ' (' +
          _this.getAttribute('location') + ')';
    }

    // build web service URL
    year = new Date(_this.getAttribute('date')).getUTCFullYear();
    _this.url = 'https://earthquake.usgs.gov/arcgis/services/ls/pwfdf_' + year +
        '/MapServer/WMSServer';

    // create references to all element objects
    _this.detailSummaryEl = _this.el.querySelector('.detail-summary');
    _this.detailMapEl = _this.el.querySelector('.detail-map-view');
    _this.detailDescriptionEl = _this.el.querySelector('.detail-description');
    _this.detailDownloadEl = _this.el.querySelector('.detail-download');

  };

  /**
   * Formats date as full month, day, year.
   * Example  August 16, 2013
   *
   * @param timestamp {Number}
   *        Millisecond timestamp
   *
   * @return {String}
   *        formatted date
   */
  _this.formatDate = function (timestamp) {
    var date,
        markup,
        months;

    date = new Date(timestamp);

    months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    markup = months[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' +
        date.getUTCFullYear();

    return markup;
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
   * Pull attributes off of _this.data
   *
   * @param key {String}
   *        The name of the attribute to return
   *
   * @return {Mixed}
   *        Attribute value
   */
  _this.getAttribute = function (key) {
    var value;

    value = _this.data[key];

    if (typeof value !== 'undefined') {
      return value;
    } else {
      return '&ndash;';
    }
  };

  /**
   * Get description to display below the map, I believe this content is static
   *
   * @return {DOMString}
   *         Detail page description
   */
  _this.getDetailDescription = function () {
    var markup;

    markup =
      '<p>' +
        'The map above displays estimates of the likelihood of ' +
        'debris flow (in &#37;), potential volume of debris flow (in ' +
        'm<sup>3</sup>), and combined relative debris flow hazard. These ' +
        'predictions are made at the scale of the drainage basin, and at the ' +
        'scale of the individual stream segment. Estimates of probability, ' +
        'volume, and combined hazard are based upon a design storm with a ' +
        'peak 15-minute rainfall intensity of 24 millimeters per hour ' +
        '(mm/h). Predictions may be viewed interactively by clicking on the ' +
        'button at the top right corner of the map displayed above.' +
      '</p>' +
      '<p>' +
        'Visit the <a href="/hazards/postfire_debrisflow/background2016.php">' +
        'Scientific Background</a> page for more information on how the ' +
        'predictions are calculated.' +
      '</p>';

    return markup;
  };

  _this.getDetailDownload = function () {
    var markup,
        url;

    url = 'https://landslides.usgs.gov/static/landslides-realtime/fires/' +
        _this.getAttribute('mapimage');

    markup =
      '<h3>Downloads</h3>' +
      '<p>' +
        'Below are the shapefiles and geodatabase information that was ' +
        'used in the creation of the maps on this page.' +
      '</p>' +
      '<ul>' +
        '<li>' +
          '<a href=" ' + url + '/PostFireDebrisFlowEstimates.zip">' +
              'Geodatabase (.gdb)</a>' +
        '</li>' +
        '<li>' +
          '<a href=" ' + url + '/Shapefiles.zip">Shapefile (.shp)</a>' +
        '</li>' +
        '<li>' +
          '<a href=" ' + url + '/image.pdf">Segmented Probability (.pdf)</a>' +
        '</li>' +
        '<li>' +
          '<a href=" ' + url + '/image.png">Segmented Probability (.png)</a>' +
        '</li>' +
        '<li>' +
          '<a href=" ' + url + '/PFDFEstimates_README.pdf">README (.pdf)</a>' +
        '</li>' +
      '</ul>';

    return markup;
  };

  /**
   * Attempts to read attributes from the data object
   *
   * @param data {Object}
   *        The options.data object passed into the constructor
   *
   * @return {Object}
   *        The attribute object pulled from the data object
   */
  _this.getData = function (data) {
    var value;

    try {
      value = data.attributes;
    } catch (e) {
      console.log(e);
      return {};
    }

    if (typeof value === 'undefined') {
      return {};
    }

    return value;
  };

  /**
   * Quick summary on the details page, inclues:
   *  - date
   *  - location
   *  - area
   *
   * @return {DOMString}
   *         Detail page quick summary
   */
  _this.getDetailSummary = function () {
    var markup;

    markup =
      '<dl class="detail-summary-list">' +
        '<dt>Date of Origin</dt>' +
        '<dd>' + _this.formatDate(_this.getAttribute('date')) + '</dd>' +
        '<dt>Location</dt>' +
        '<dd>' + _this.getAttribute('location') + '</dd>' +
        '<dt>Total Area Burned</dt>' +
        '<dd>' + _this.getAttribute('size') + ' km<sup>2</sup></dd>' +
      '</dl>';

    return markup;
  };

  /**
   * Load the static map image.
   *
   */
  _this.loadMapImage = function () {
    _this.detailMapEl.classList.add('detail-map-image');
    _this.detailMapEl.innerHTML = '<img src="' +
        'https://landslides.usgs.gov/static/landslides-realtime/fires/' +
        _this.getAttribute('mapimage') + '/image.png" ' +
        'alt="Segemented Probability Basin image" />';
  };

  /**
   * Load the leaflet map view.
   *
   */
  _this.loadMapView = function () {
    _this.detailMapEl.classList.add('detail-map-leaflet');
    _this.detailMapView = DetailMapView({
      el: _this.detailMapEl,
      data: _this.data,
      url: _this.url
    });
  };

  /**
   * Determines whether to load a leaflet map or a static map image.
   *
   * If the web service (_this.url) exists (returns status === 200,
   * then a static image of the segmented probability is loaded in place
   * of the map from an ftp server.
   *
   */
  _this.getDetailMap = function () {
    Xhr.ajax({
      url: _this.url,
      success: function () {
        // if ws response.status = 200, Display leaflet map
        _this.loadMapView();
      },
      error: function () {
        // if ws response.status != 200, display static image
        _this.loadMapImage();
      }
    });
  };

  /**
   * Render the view
   *
   */
  _this.render = function () {
    // Display summary info on details page
    _this.detailSummaryEl.innerHTML = _this.getDetailSummary();
    // Load map or map images
    _this.getDetailMap();
    // Display description below the map
    _this.detailDescriptionEl.innerHTML = _this.getDetailDescription();
    // Display downloads
    _this.detailDownloadEl.innerHTML = _this.getDetailDownload();
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = DetailView;

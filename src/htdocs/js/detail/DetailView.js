'use strict';


var DetailMapView = require('detail/DetailMapView'),
    Util = require('util/Util');


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
    var titleEl;

    _this.el = options.el || document.createElement('div');
    _this.data = options.data;

    if (!_this.data || !_this.data.attributes) {
      _this.el.innerHTML = '<p class="alert error">No Data to load.</p>';
      return;
    }

    _this.el.classList.add('detail-view');
    _this.el.innerHTML =
        '<div class="detail-summary"></div>' +
        '<h2>Preliminary Hazard Assessment</h2>' +
        '<div class="detail-map-view"></div>' +
        '<div class="detail-description"></div>' +
        '<div class="detail-download"></div>';

    // Update page title
    titleEl = document.querySelector('.page-header > h1');
    titleEl.innerHTML = _this.getAttribute('fire') + ' (' +
        _this.getAttribute('location') + ')';

    // Display summary info on details page
    _this.detailSummaryEl = _this.el.querySelector('.detail-summary');
    _this.detailSummaryEl.innerHTML = _this.getDetailSummary();

    // Load map or map images
    _this.detailMapEl = _this.el.querySelector('.detail-map-view');
    _this.getDetailMap();

    // Display description below the map
    _this.detailDescriptionEl = _this.el.querySelector('.detail-description');
    _this.detailDescriptionEl.innerHTML = _this.getDetailDescription();

    // Display downloads
    _this.detailDownloadEl = _this.el.querySelector('.detail-download');
    _this.detailDownloadEl.innerHTML = _this.getDetailDownload();
  };

  /**
   * Formats date as full month, day, year.
   * Example  August 16, 2013
   *
   * @return {String}
   *         formatted date
   */
  _this.formatDate = function () {
    var date,
        markup,
        months;

    date = new Date(_this.getAttribute('date'));

    markup = [];
    months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    markup.push(
      months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
    );

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
    try {
      return _this.data.attributes[key];
    } catch (e) {
      console.log(e.stack);
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
        'predictions are calculated. For more information about what to do ' +
        'in case you live in an area where debris flows are possible, please ' +
        'visit <a href="/research/wildfire/whattodo.php">If you live in a ' +
        'recently burned area, and there is a rainstorm…</a>' +
      '</p>';

    return markup;
  };

  _this.getDetailDownload = function () {
    var markup,
        url;

    url = 'ftp://hazards.cr.usgs.gov/web/landslides-post-wildfire-debris' +
        '-flow/fires/' + _this.getAttribute('mapimage');

    markup =
      '<h3>Downloads</h3>' +
      '<p>' +
        'Below are the shapefiles and geodatabase information that was ' +
        'used in the creation of the maps on this page.' +
      '</p>' +
      '<ul>' +
        '<li>' +
          '<a href=" ' + url + '/PostFireDebrisFlowEstimates.zip">' +
              'Post Fire Debris Flow Estimates (.zip)</a>' +
        '</li>' +
        '<li>' +
          '<a href=" ' + url + '/Shapefiles.zip">Shapefile (.zip)</a>' +
        '</li>' +
        '<li>' +
          '<a href=" ' + url + '/PFDFEstimates_README.pdf">README (.pdf)</a>' +
        '</li>' +
        '<li>' +
          '<a href=" ' + url + '/image.pdf">Image (.pdf)</a>' +
        '</li>' +
        '<li>' +
          '<a href=" ' + url + '/image.png">Image (.png)</a>' +
        '</li>' +
      '</ul>';

    return markup;
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
        '<dd>' + _this.formatDate() + '</dd>' +
        '<dt>Location</dt>' +
        '<dd>' + _this.getAttribute('location') + '</dd>' +
        '<dt>Total Area Burned</dt>' +
        '<dd>' + _this.getAttribute('size') + ' km<sup>2</sup></dd>' +
      '</dl>';

    return markup;
  };

  /**
   * Determines whether to load a leaflet map or a static map image.
   *
   * If the event is more than two calendar years old, then a static image
   * of the segmented probability is loaded in place of the map from an
   * ftp server.
   *
   */
  _this.getDetailMap = function () {
    var eventYear,
        currentYear,
        url;

    currentYear = new Date().getFullYear();
    eventYear = new Date(_this.getAttribute('date')).getFullYear();
    url = 'ftp://hazards.cr.usgs.gov/web/landslides-post-wildfire-debris-' +
        'flow/fires/' + _this.getAttribute('mapimage') + '/image.png';

    // Older than two years, display image
    if ((currentYear - eventYear) > 1) {
      // display static image
      _this.detailMapEl.classList.add('detail-map-image');
      _this.detailMapEl.innerHTML = '<img src="' + url + '" ' +
          'alt="Segemented Probability Basin image" />';
    } else {
      // Display leaflet map with all layers
      _this.detailMapEl.classList.add('detail-map-leaflet');
      _this.detailMapView = DetailMapView({
        el: _this.detailMapEl,
        data: _this.data
      });
    }
  };

  /**
   * Renders the detail view.
   *
   */
  _this.render = function () {
    _this.detailDescriptionEl.innerHTML = _this.getDetailDescription();
    _this.detailSummaryEl.innerHTML = _this.getDetailSummary();
    _this.detailDownloadEl.innerHTML = _this.getDetailDownload();
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = DetailView;

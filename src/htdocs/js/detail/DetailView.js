'use strict';


var DetailDownloadView = require('detail/DetailDownloadView'),
    DetailMapView = require('detail/DetailMapView'),
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
    var attributes,
        titleEl;

    _this.el = options.el || document.createElement('div');
    _this.data = options.data;

    attributes = _this.data.attributes;
    if (!attributes) {
      _this.el.innerHTML = '<p class="alert error">No Data to load.</p>';
      return;
    }

    _this.el.classList.add('detail-view');
    _this.el.innerHTML =
        '<div class="detail-summary"></div>' +
        '<h2>Preliminary Hazard Assessment</h2>' +
        '<div class="detail-map-view"></div>' +
        '<div class="detail-description"></div>' +
        '<div class="detail-download-view"></div>';

    // Update page title
    if (attributes && attributes.fire && attributes.location) {
      titleEl = document.querySelector('.page-header > h1');
      titleEl.innerHTML = attributes.fire + ' (' + attributes.location + ')';
    }

    // Display summary info on details page
    _this.detailSummaryEl = _this.el.querySelector('.detail-summary');
    _this.detailSummaryEl.innerHTML = _this.getDetailSummary();

    // Display Map with details
    _this.detailMapView = DetailMapView({
      el: _this.el.querySelector('.detail-map-view'),
      data: _this.data
    });

    // Display description below the map
    _this.detailDescriptionEl = _this.el.querySelector('.detail-description');
    _this.detailDescriptionEl.innerHTML = _this.getDetailDescription();

    // Display downloads
    _this.detailDownloadView = DetailDownloadView({
      el: _this.el.querySelector('.detail-download-view'),
      data: _this.data
    });
    _this.detailDownloadView.render();
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
   * Get description to display below the map, I believe this content is static
   *
   * @return {DOMString}
   *         Detail page description
   */
  _this.getDetailDescription = function () {
    var markup;

    markup =
      '<p>' +
        'The interactive map above displays estimates of the likelihood of ' +
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
    var attributes,
        markup;

    attributes = _this.data.attributes;
    if(!attributes) {
      return '<p class="alert error">No Data to load.</p>';
    }

    markup =
      '<dl class="detail-summary-list">' +
        '<dt>Date of Origin</dt>' +
        '<dd>' + new Date(attributes.date) + '</dd>' +
        '<dt>Location</dt>' +
        '<dd>' + attributes.location + '</dd>' +
        '<dt>Total Area Burned</dt>' +
        '<dd>' + attributes.size + ' km<sup>2</sup></dd>' +
      '</dl>';

    return markup;
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = DetailView;

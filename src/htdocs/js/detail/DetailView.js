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
    // summary data from wildfire
    _this.summary = options.summary || {};

    _this.el = options.el || document.createElement('div');
    _this.el.classList.add('detail-view');
    _this.el.innerHTML =
        '<div class="detail-summary"></div>' +
        '<h2>Preliminary Hazard Assessment</h2>' +
        '<div class="detail-map-view"></div>' +
        '<div class="detail-description"></div>' +
        '<div class="detail-download-view"></div>';

    _this.detailDescriptionEl = document.querySelector('.detail-description');
    _this.detailSummaryEl = document.querySelector('.detail-summary');

    _this.detailDownloadView = DetailDownloadView({
      el: document.querySelector('.detail-download-view'),
      data: _this.getDownloads(_this.summary)
    });

    _this.detailMapView = DetailMapView({
      el: document.querySelector('.detail-map-view'),
      data: _this.summary
    });
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
    return 'TODO, display description describing the image';
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
    return 'TODO, display summary information for fire';
  };

  /**
   * Makes an ajax request to ArcGIS web service to request all
   * geodatabase/shape files for the wildfire event.
   *
   * @return {Array}
   *         An array of downloads to display in a list
   */
  _this.getDownloads = function () {
    return 'TODO, display downloads for details page';
  };

  /**
   * Renders the detail view.
   *
   */
  _this.render = function () {
    _this.detailDownloadView.render();

    _this.detailDescriptionEl.innerHTML = _this.getDetailDescription();
    _this.detailSummaryEl.innerHTML = _this.getDetailSummary();
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = DetailView;

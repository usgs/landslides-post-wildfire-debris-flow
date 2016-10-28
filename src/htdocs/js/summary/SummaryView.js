'use strict';


var SummaryMapView = require('summary/SummaryMapView'),
    Util = require('util/Util'),
    View = require('mvc/View');


var _DEFAULTS;

_DEFAULTS = {};


/**
 * Creates layout for the summary view.
 *
 */
var SummaryView = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = View(options);

  /**
   * Constructor for this view.
   *
   * @param options {Object}
   *     Configuration options for this view.
   */
  _initialize = function () {
    _this.el.classList.add('summary-view');
    _this.el.innerHTML =
        '<div class="summary-map-view"></div>' +
        '<div class="summary-collection-table horizontal-scroll"></div>';

    // sort array in descending order
    _this.data = (options.data || []).sort(function (a,b) {
      return b.attributes.date - a.attributes.date;
    });

    // pass array to map view
    _this.summaryMapView = SummaryMapView({
      el: document.querySelector('.summary-map-view'),
      data: _this.data
    });
    _this.summaryMapView.render();
  };

  /**
   * Build list of fire events that link to details page
   *
   * @param data {Array}
   *        An array of features from the ArcGIS web service request
   *
   */
  _this.createSummaryList = function (data) {
    // TODO, create list of events
    data.forEach(function (item) {
      console.log(item.attributes.date);
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
   * Renders the summary view.
   *
   */
  _this.render = function () {
    // render map view
    _this.summaryMapView.render();
    // build list of summary events
    _this.createSummaryList(_this.data);
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = SummaryView;

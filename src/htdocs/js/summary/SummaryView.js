'use strict';


var SummaryListView = require('summary/SummaryListView'),
    SummaryMapView = require('summary/SummaryMapView'),
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
  _initialize = function (options) {
    // links are defined on page outside application
    var summaryLinks = document.querySelector('.summary-links');

    _this.el.classList.add('summary-view');
    _this.el.innerHTML =
        '<div class="summary-map-view"></div>' +
        '<div class="row">' +
          '<div class="column two-of-three summary-list-view"></div>' +
          '<div class="column one-of-three summary-links"></div>' +
        '</div>';

    // Transform list of fires into object keyed by years
    _this.data = _this.orderEvents(options.data);

    // pass array to map view
    _this.summaryMapView = SummaryMapView({
      el: _this.el.querySelector('.summary-map-view'),
      data: _this.data
    });

    _this.summaryListView = SummaryListView({
      el: _this.el.querySelector('.summary-list-view'),
      data: _this.data
    });

    // move links outside application into application layout
    if (summaryLinks) {
      _this.el.querySelector('.summary-links').appendChild(summaryLinks);
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
   * Create an object with all fires keyed by year.
   *
   * @param data {Array}
   *        An array of features from the ArcGIS web service request
   *        (options.data)
   *
   * @return {Object}
   *        An object with all fires keyed by year:
   *        {
   *          “2016”: [ {fire}, ... ],
   *          “2015”: [ {fire}, ... ]
   *        }
   *
   */
  _this.orderEvents = function (data) {
    var i,
        len,
        obj,
        year;

    if (!data) {
      return;
    }

    obj = {};

    // sort in descending order
    data = data.sort(function (a,b) {
      return b.attributes.date - a.attributes.date;
    });

    for (i = 0, len = data.length; i < len; i++) {
      // pull year off date
      year = new Date(data[i].attributes.date).getUTCFullYear();
      // check if year key is already on the object
      if (!obj.hasOwnProperty(year)) {
        obj[year] = [];
      }
      obj[year].push(data[i]);
    }

    return obj;
  };


  /**
   * Renders the summary view.
   *
   */
  _this.render = function () {
    // render map view
    _this.summaryMapView.render();
    // render list view
    _this.summaryListView.render();
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = SummaryView;

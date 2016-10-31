'use strict';


var Collection = require('mvc/Collection'),
    SummaryCollectionTable = require('summary/SummaryCollectionTable'),
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
  _initialize = function () {
    _this.el.classList.add('summary-view');
    _this.el.innerHTML =
        '<div class="summary-map-view"></div>' +
        '<div class="summary-collection-table"></div>';

    _this.collection = options.collection || Collection([]);

    _this.summaryMapView = SummaryMapView({
      el: document.querySelector('.summary-map-view'),
      collection: _this.collection
    });

    _this.summaryCollectionTable = SummaryCollectionTable({
      el: document.querySelector('.summary-collection-table'),
      collection: _this.collection
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
    _this.summaryMapView.render();
    _this.summaryCollectionTable.render();
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = SummaryView;

'use strict';


var Util = require('util/Util'),
    CollectionTable = require('mvc/CollectionTable');


var _DEFAULTS;

_DEFAULTS = {};


/**
 * Creates list of fires for the summary view.
 *
 */
var SummaryCollectionTable = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = CollectionTable(options);

  /**
   * Constructor for this view.
   *
   * @param options {Object}
   *     Configuration options for this view.
   */
  _initialize = function () {
    _this.el.classList.add('summary-collection-table');
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


  _initialize(options);
  options = null;
  return _this;
};


module.exports = SummaryCollectionTable;

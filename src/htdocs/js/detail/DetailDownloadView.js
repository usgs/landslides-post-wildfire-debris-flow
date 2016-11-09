'use strict';


var Util = require('util/Util'),
    View = require('mvc/View');


var _DEFAULTS;

_DEFAULTS = {};


/**
 * Creates a list of downloads at the bottom of the DownloadView
 *
 */
var DetailDownloadView = function (options) {
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
    _this.el.classList.add('detail-download-view');
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

  _this.render = function () {
    _this.el.innerHTML = 'TODO, Create Detail Download List';
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = DetailDownloadView;

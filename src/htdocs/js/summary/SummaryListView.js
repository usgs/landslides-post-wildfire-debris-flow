'use strict';


var Accordion = require('accordion/Accordion'),
    Util = require('util/Util'),
    View = require('mvc/View');

var _DEFAULTS = {};

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
    // scaffold the list
    _this.el = options.el || document.createElement('div');
    _this.el.innerHTML = '<div class="accordion-group"></div>';

    // create accordion
    _this.accordion = Accordion({
      el: _this.el.querySelector('.accordion-group'),
      accordions: []
    });

    // set data
    _this.data = options.data || {};
  };

  /**
   * Build list of fire events that link to details page
   *
   * @param data {Array}
   *        An array of features from the ArcGIS web service request
   *
   */
  _this.createSummaryList = function () {
    var data,
        keys;


    keys = Object.keys(_this.data);
    keys = keys.sort(function (a,b) { return b - a; });

    // if feed is empty display an error
    if (!keys || keys.length === 0) {
      _this.el.innerHTML =
      '<p class="alert error">No data to display at this time.</p>';
      return;
    }

    for (var x = 0; x < keys.length; x++) {
      let content = [],
          title = '';

      // grab one year of data
      data = _this.data[keys[x]];
      title = keys[x] + ' Fires';
      content.push('<ul class="' + keys[x] + '-fires">');

      // loop through entire year of fires
      for (var i = 0; i < data.length; i++) {
        content.push('<li>', _this.formatSummaryListItem(data[i]), '</li>');
      }

      content.push('</ul>');

      // add accordion section to accordion
      _this.accordion.addAccordion({
        classes: (x !== 0 ? 'accordion-closed': ''),
        contentText: content.join(''),
        toggleElement: 'h3',
        toggleText: title
      });
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
   * Format a list item for the summary list. The list item is a link to
   * the details page.
   *
   * @param item {Object}
   *        item.attributes.
   *         - objectid
   *         - date
   *         - fire
   *         - location
   *
   * @return {DOMString}
   *         returns a list item string with nested link
   *
   */
  _this.formatSummaryListItem = function (item) {
    var date,
        markup,
        months;

    markup = [];
    months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    try {
      date = new Date(item.attributes.date);
      markup.push(
        '<a href="detail.php?objectid=' + item.attributes.OBJECTID + '">' +
          months[date.getUTCMonth()] + ' - ',
          item.attributes.fire,
          '(' + item.attributes.location + ')' +
        '</a>'
      );
      return markup.join(' ');
    } catch (e) {
      return '<p class="alert error">' + e + '<p>';
    }
  };

  /**
   * Renders the summary view.
   *
   */
  _this.render = function () {
    // Build summary list with accordions
    _this.createSummaryList();
  };


  _initialize(options);
  options = null;
  return _this;
};


module.exports = SummaryView;

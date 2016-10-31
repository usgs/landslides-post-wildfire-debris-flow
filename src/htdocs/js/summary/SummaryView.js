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
        '<p class="summary-intro"></p>' +
        '<h2>Current and Previous Year Fires</h2>' +
        '<div class="summary-map-view"></div>' +
        '<div class="row">' +
          '<div class="column two-of-three summary-list"></div>' +
          '<div class="column one-of-three summary-links"></div>' +
        '</div>';

    // sort array in descending order
    _this.data = (options.data || []).sort(function (a,b) {
      return b.attributes.date - a.attributes.date;
    });

    // pass array to map view
    _this.summaryMapView = SummaryMapView({
      el: document.querySelector('.summary-map-view'),
      data: _this.data
    });

    // render the view
    _this.render();
  };

  _this.loadStaticContent = function () {
    _this.el.querySelector('.summary-intro').innerHTML =
      'Wildfire can significantly alter the hydrologic response of a ' +
      'watershed to the extent that even modest rainstorms can produce ' +
      'dangerous flash floods and debris flows. The USGS conducts ' +
      'post-fire debris-flow hazard assessments for select fires in the ' +
      'Western U.S. We use geospatial data related to basin morphometry, ' +
      'burn severity, soil properties, and rainfall characteristics to ' +
      'estimate the probability and volume of debris flows that may ' +
      'occur in response to a design storm.';

    _this.el.querySelector('.summary-links').innerHTML =
      '<h3>Contact Us</h3>' +
      '<ul>' +
        '<li>' +
          'Dennis Staley ' +
          '(<a href="mailto:dstaley@usgs.gov">dstaley@usgs.gov</a>)' +
        '</li>' +
        '<li>' +
          'Jason Kean ' +
          '(<a href="mailto:jwkean@usgs.gov">jwkean@usgs.gov</a>)' +
        '</li>' +
      '</ul>' +

      '<h3>Related Links</h3>' +
      '<ul>' +
        '<li>' +
          '<a href="http://landslides.usgs.gov/research/wildfire/">' +
          'Post-Wildfire Landslide Hazards</a>' +
        '</li>' +
        '<li>' +
          '<a href="http://landslides.usgs.gov/hazards/warningsys.php">' +
          'Early Warning System</a>' +
        '</li>' +
        '<li>' +
          '<a href="http://landslides.usgs.gov/dysi/">' +
          'Did You See It? Report a Landslide</a>' +
        '</li>' +
      '</ul>' +

      '<h3>GIS Service Information</h3>' +
      '<ul>' +
        '<li>' +
          '<a href="http://earthquake.usgs.gov/arcgis/rest/services/ls/' +
          'pwfdf_locations/MapServer">Post-Fire Debris-Flow Hazards GIS ' +
          'Services</a>' +
        '</li>' +
        '<li>' +
          '<a href="https://github.com/usgs/hazdev-gis/blob/master/' +
          'documentation.md">Landslides GIS Server Documentation</a>' +
        '</li>' +
      '</ul>';
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
    _this.el.querySelector('.summary-list').innerHTML =
        '<p>TODO, Create Summary List</p>';
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
    // display static content
    _this.loadStaticContent();
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

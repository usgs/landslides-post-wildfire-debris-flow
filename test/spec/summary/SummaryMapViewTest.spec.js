/* global chai, describe, it */
'use strict';

var SummaryMapView = require('../../../src/htdocs/js/summary/SummaryMapView');

var expect = chai.expect;


describe('SummaryMapView', function () {
  describe('constructor', function () {
    it('Can be required', function () {
      /* jshint -W030 */
      expect(SummaryMapView).to.not.be.null;
      /* jshint +W030 */
    });

    it('can be destroyed', function () {
      var view;

      view = SummaryMapView();
      expect(view.destroy).to.not.throw(Error);
    });

    it('adds a fire layer', function () {
      var view;

      view = SummaryMapView();
      expect(view.map.hasLayer(view.fires)).to.be.true;
    });
  });
});
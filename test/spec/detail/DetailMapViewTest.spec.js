/* global chai, describe, it */
'use strict';

var DetailMapView = require('detail/DetailMapView');

var expect = chai.expect;


describe('DetailMapView', function () {
  describe('constructor', function () {
    it('Can be required', function () {
      /* jshint -W030 */
      expect(DetailMapView).to.not.be.null;
      /* jshint +W030 */
    });

    it('can be destroyed', function () {
      var view;

      view = DetailMapView();
      expect(view.destroy).to.not.throw(Error);
    });

    it('adds overlays', function () {
      var view;

      view = DetailMapView();

      expect(view.map.hasLayer(view.fire)).to.be.true;
    });
  });

  describe('getZoomLevel', function () {
    it('returns the correct zoom level', function () {
      var view;

      view = DetailMapView();

      expect(view.getZoomLevel(0)).to.equal(13);
      expect(view.getZoomLevel(50)).to.equal(12);
      expect(view.getZoomLevel(150)).to.equal(11);
      expect(view.getZoomLevel(null)).to.equal(11);
      expect(view.getZoomLevel(500)).to.equal(10);
      expect(view.getZoomLevel(1000)).to.equal(9);
    });
  });
});
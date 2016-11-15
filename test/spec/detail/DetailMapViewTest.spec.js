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
  });
});
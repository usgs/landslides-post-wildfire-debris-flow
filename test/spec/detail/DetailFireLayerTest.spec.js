/* global afterEach, beforeEach, chai, describe, it, L, sinon */
'use strict';

var DetailFireLayer = require('detail/DetailFireLayer');

var data,
    expect,
    map;

expect = chai.expect;

data = {
  'attributes': {
    'objectid':81,
    'fire':'Junkins Fire',
    'lat':38.159999999999997,
    'lon':-105.09999999999999,
    'location':'Pike and San Isabel National Forest, CO',
    'date': new Date().getTime(),
    //'date':1476662400000,
    'size':74,
    'mapimage':'20161017_junkins'
  }
};

map = L.map(document.createElement('div'), {
  center: [41.5, -112.0],
  maxBounds: [
    [-90, -Infinity],
    [90, Infinity]
  ],
  zoom: 5,
  zoomAnimation: false
});


describe('DetailFireLayer', function () {
  var layer;

  beforeEach(function () {
    layer = DetailFireLayer({
      el: document.createElement('div'),
      data: data
    });
    layer.map = map;
  });

  afterEach(function () {
    layer.destroy();
  });

  describe('constructor', function () {
    it('Can be required', function () {
      /* jshint -W030 */
      expect(DetailFireLayer).to.not.be.null;
      /* jshint +W030 */
    });

    it('can be destroyed', function () {
      var layer;

      layer = DetailFireLayer();
      expect(layer.destroy).to.not.throw(Error);
    });
  });

  describe('onAdd', function () {
    it('adds markers to map', function () {
      var stub;

      stub = sinon.stub(layer, 'addOverlays', function () { return; });
      layer.onAdd();

      expect(stub.callCount).to.equal(1);
    });
    it('sets _this.map', function () {
      var map;

      sinon.stub(layer, 'addOverlays', function () { return; });

      map = 'map';
      layer.onAdd(map);

      expect(layer.map).to.equal(map);
    });
  });

  describe('onRemove', function () {
    it('sets _this.map to null', function () {
      layer.map = 'map';
      layer.onRemove();

      expect(layer.map).to.equal(null);
    });
  });
});

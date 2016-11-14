/* global afterEach, beforeEach, chai, describe, it, L, sinon */
'use strict';

var SummaryFireLayer = require('summary/SummaryFireLayer');

var data,
    expect,
    icon,
    iconUrl,
    map;

expect = chai.expect;

data = {
  '2013': [{
    'attributes': {
      'objectid': 6,
      'fire': 'Elk/Pony Complex Fire',
      'lat': 43.409999999999997,
      'lon': -115.48,
      'location': 'Elmore County, Idaho',
      'service': 'cms',
      'date': 1375920000000,
      'size': 531
    }
  }],
  '2014': [{
    'attributes': {
      'objectid': 8,
      'fire': 'Signal Fire',
      'lat': 32.923999999999999,
      'lon': -108.145,
      'location': 'Grant County, New Mexico',
      'service': 'cms',
      'date': 1399766400000,
      'size': 22.199999999999999
    }
  }],
  '2015': [{
    'attributes': {
      'objectid': 47,
      'fire': 'Clearwater Fire',
      'lat': 46.283999999999999,
      'lon': -116.01000000000001,
      'location': 'Lewis, Clearwater, Idaho Counties, Idaho',
      'service': 'cms',
      'date': 1439164800000,
      'size': 192.09999999999999
    }
  }],
  '2016': [{
    'attributes': {
      'objectid': 80,
      'fire': 'Yale Road Spokane Complex Fire',
      'lat': 47.490000000000002,
      'lon': -117.29000000000001,
      'location': 'Spokane County, WA',
      'service': 'wms',
      'date': 1471737600000,
      'size': 23
    }
  }, {
    'attributes': {
      'objectid': 81,
      'fire': 'Chimney Fire',
      'lat': 35.740000000000002,
      'lon': -121.06999999999999,
      'location': 'San Luis Obispo County',
      'service': 'wms',
      'date': 1471046400000,
      'size': 187
    }
  }]
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

iconUrl = 'test/icon.png';

icon = L.icon({
  iconUrl: iconUrl,
  iconRetinaUrl: 'my-icon@2x.png',
  iconSize: [15, 20],
  iconAnchor: [10, 18],
  popupAnchor: [-3, -16]
});


describe('SummaryFireLayer', function () {
  var layer;

  beforeEach(function () {
    layer = SummaryFireLayer({
      el: document.createElement('div'),
      data: data,
      icon: icon
    });
    layer.map = map;
  });

  afterEach(function () {
    layer.destroy();
  });

  describe('constructor', function () {
    it('Can be required', function () {
      /* jshint -W030 */
      expect(SummaryFireLayer).to.not.be.null;
      /* jshint +W030 */
    });

    it('can be destroyed', function () {
      var layer;

      layer = SummaryFireLayer();
      expect(layer.destroy).to.not.throw(Error);
    });
  });

  describe('addMarkers', function () {
    it('adds markers to map', function () {
      var stub;

      stub = sinon.stub(layer.layers, 'addBaseLayer', function () {
        return;
      });
      layer.addMarkers();

      // all five fires are plotted
      expect(stub.callCount).to.equal(4);
      expect(stub.getCall(0).args[0].getLayers().length).to.equal(2);
      expect(stub.getCall(1).args[0].getLayers().length).to.equal(1);
      expect(stub.getCall(2).args[0].getLayers().length).to.equal(1);
      expect(stub.getCall(3).args[0].getLayers().length).to.equal(1);
    });
    it('splits markers into different years', function () {
      var stub;

      stub = sinon.stub(layer.layers, 'addBaseLayer', function () {
        return;
      });
      layer.addMarkers();

      // all four years are represented
      expect(stub.callCount).to.equal(4);
      expect(stub.getCall(0).args[1]).to.equal('2016');
      expect(stub.getCall(1).args[1]).to.equal('2015');
      expect(stub.getCall(2).args[1]).to.equal('2014');
      expect(stub.getCall(3).args[1]).to.equal('2013');
    });
    it('uses a custom fire icon', function () {
      expect(layer.icon).to.equal(icon);
    });
  });

  describe('onAdd', function () {
    it('adds markers to map', function () {
      var stub;

      stub = sinon.stub(layer, 'addMarkers', function () { return; });
      layer.onAdd();

      expect(stub.callCount).to.equal(1);
    });
    it('sets _this.map', function () {
      var map;

      sinon.stub(layer, 'addMarkers', function () { return; });

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

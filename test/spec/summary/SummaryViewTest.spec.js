/* global afterEach, beforeEach, chai, describe, it, sinon */
'use strict';

var SummaryView = require('summary/SummaryView');

var expect = chai.expect;

var data = [
  {
    'attributes': {
      'objectid': 3,
      'fire': 'Trailhead Fire',
      'lat': 38.960000000000001,
      'lon': -120.81999999999999,
      'location': 'El Dorado County, CA',
      'service': 'wms',
      'date': 1467072000000,
      'size': 22
    }
  },
  {
    'attributes': {
      'objectid': 2,
      'fire': 'Erskine Fire',
      'lat': 35.57,
      'lon': -118.31999999999999,
      'location': 'Kern County, CA',
      'service': 'wms',
      'date': 1466640000000,
      'size': 194
    }
  },
  {
    'attributes': {
      'objectid': 1,
      'fire': 'San Gabriel Complex Fire',
      'lat': 34.200000000000003,
      'lon': -117.88,
      'location': 'Angeles National Forest, CA',
      'service': 'wms',
      'date': 1466380800000,
      'size': 21
    }
  }
];

describe('SummaryView', function () {
  var view;

  beforeEach(function () {
    view = SummaryView({
      el: document.createElement('div'),
      data: data
    });
  });

  afterEach(function () {
    view.destroy();
  });

  describe('Constructor', function () {
    it('Can be defined', function () {
      /* jshint -W030 */
      expect(SummaryView).not.to.be.undefined;
      /* jshint +W030 */
    });

    it('Can be created and destroyed', function () {
      var sv = SummaryView({});
      sv.destroy();
    });
  });

  describe('orderEvents', function () {
    it('orders the events', function () {
      var events;

      events = view.orderEvents(data);

      expect(events['2016'].length).to.equal(3);
      expect(events['2016'][0].attributes.objectid).to.equal(3);
      expect(events['2016'][1].attributes.objectid).to.equal(2);
      expect(events['2016'][2].attributes.objectid).to.equal(1);
    });
  });


  describe('render', function () {
    it('loads static content, renders the map, creates list', function () {
      var listStub,
          mapStub;

      listStub = sinon.stub(view.summaryListView, 'render', function () {
        return;
      });

      mapStub = sinon.stub(view.summaryMapView, 'render', function () {
        return;
      });

      view.render();

      expect(listStub.callCount).to.equal(1);
      expect(mapStub.callCount).to.equal(1);
    });
  });


});

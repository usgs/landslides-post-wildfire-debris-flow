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

  describe('createSummaryList', function () {
    it('lists all events that are passed into view', function () {
      var el,
          stub;

      stub = sinon.stub(view, 'formatSummaryListItem', function () {
        return '';
      });
      view.createSummaryList();
      el = view.el.querySelector('.summary-list');

      expect(stub.callCount).to.equal(3);
      expect(el.querySelectorAll('h3').length).to.equal(1);
      expect(el.querySelectorAll('ul').length).to.equal(1);
      expect(el.querySelectorAll('li').length).to.equal(3);
    });
  });

  describe('formatSummaryListItem', function () {
    it('formats a single feature into a list item', function () {
      var attributes,
          el,
          link,
          markup;

      attributes = data[0].attributes;
      el = document.createElement('div');
      markup = view.formatSummaryListItem(data[0]);

      el.innerHTML = markup;
      link = el.querySelector('a');

      expect(link).to.not.be.null;
      expect(link.innerHTML.indexOf('June')).to.equal(0);
      expect(link.innerHTML.indexOf(attributes.fire)).to.equal(8);
      expect(link.innerHTML.indexOf(attributes.location)).to.equal(24);

    });
  });

  describe('loadStaticContent', function () {
    it('loads static content into the page skeleton', function () {
      var summaryIntroEl,
          summaryLinksEl;

      summaryIntroEl = view.el.querySelector('.summary-intro');
      summaryLinksEl = view.el.querySelector('.summary-links');

      expect(summaryIntroEl.innerHTML).to.equal('');
      expect(summaryLinksEl.innerHTML).to.equal('');

      view.loadStaticContent();

      expect(summaryIntroEl.innerHTML).to.not.equal('');
      expect(summaryLinksEl.innerHTML).to.not.equal('');
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
          mapStub,
          staticStub;

      listStub = sinon.stub(view, 'createSummaryList', function () {
        return;
      });

      mapStub = sinon.stub(view.summaryMapView, 'render', function () {
        return;
      });

      staticStub = sinon.stub(view, 'loadStaticContent', function () {
        return;
      });

      view.render();

      expect(listStub.callCount).to.equal(1);
      expect(mapStub.callCount).to.equal(1);
      expect(staticStub.callCount).to.equal(1);
    });
  });


});

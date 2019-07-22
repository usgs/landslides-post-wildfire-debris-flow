/* global afterEach, beforeEach, chai, describe, it, sinon */
'use strict';

var SummaryListView = require('summary/SummaryListView');

var expect = chai.expect;

var data = {
  '2016': [
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
  ]
};

describe('SummaryListView', function () {
  var view;

  beforeEach(function () {
    view = SummaryListView({
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
      expect(SummaryListView).not.to.be.undefined;
      /* jshint +W030 */
    });

    it('Can be created and destroyed', function () {
      var sv = SummaryListView({});
      sv.destroy();
    });
  });

  describe('createSummaryList', function () {
    it('lists all events that are passed into view', function () {
      sinon.stub(view, 'formatSummaryListItem', function () {
        return '';
      });

      sinon.stub(view.accordion, 'addAccordion', () => {
        return;
      });

      view.createSummaryList();

      expect(view.formatSummaryListItem.called).to.be.true;
      expect(view.accordion.addAccordion.called).to.be.true;

    });
  });

  describe('formatSummaryListItem', function () {
    it('formats a single feature into a list item', function () {
      var el,
          link,
          item,
          markup;

      item = data['2016'][0];
      el = document.createElement('div');
      markup = view.formatSummaryListItem(item);

      el.innerHTML = markup;
      link = el.querySelector('a');

      expect(link).to.not.be.null;
      expect(link.innerHTML.indexOf('June')).to.equal(0);
      expect(link.innerHTML.indexOf(item.attributes.fire)).to.equal(8);
      expect(link.innerHTML.indexOf(item.attributes.location)).to.equal(24);

    });
  });

  describe('render', function () {
    it('creates list', function () {
      var listStub;

      listStub = sinon.stub(view, 'createSummaryList', function () {
        return;
      });

      view.render();

      expect(listStub.callCount).to.equal(1);
    });
  });


});

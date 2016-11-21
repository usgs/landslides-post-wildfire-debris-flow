/* global afterEach, beforeEach, chai, describe, it */
'use strict';

var DetailView = require('detail/DetailView');

var expect = chai.expect;

var data = {
  'attributes': {
    'objectid':81,
    'fire':'Junkins Fire',
    'lat':38.159999999999997,
    'lon':-105.09999999999999,
    'location':'Pike and San Isabel National Forest, CO',
    'date': new Date().getTime(),
    'size':74,
    'mapimage':'20161017_junkins'
  }
};

describe('DetailView', function () {
  var view;

  beforeEach(function () {
    view = DetailView({
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
      expect(DetailView).not.to.be.undefined;
      /* jshint +W030 */
    });

    it('Can be created and destroyed', function () {
      var dv = DetailView();
      dv.destroy();
    });
  });

  describe('formatDate', function () {
    it('can format a date', function () {
      var date;

      date = view.formatDate(1476662400000);

      console.log(date);

      expect(date.indexOf('October')).to.equal(0);
      expect(date.indexOf('17')).to.equal(8);
      expect(date.indexOf('2016')).to.equal(12);
    });
  });

  describe('getAttribute', function () {
    it('pulls an attribute off the object', function () {
      expect(view.getAttribute('objectid')).to.equal(data.attributes.objectid);
      expect(view.getAttribute('fire')).to.equal(data.attributes.fire);
      expect(view.getAttribute('lat')).to.equal(data.attributes.lat);
      expect(view.getAttribute('lon')).to.equal(data.attributes.lon);
      expect(view.getAttribute('location')).to.equal(data.attributes.location);
      expect(view.getAttribute('date')).to.equal(data.attributes.date);
      expect(view.getAttribute('size')).to.equal(data.attributes.size);
      expect(view.getAttribute('mapimage')).to.equal(data.attributes.mapimage);
    });
    it('returns &ndash; when attribute does not exist', function () {
      expect(view.getAttribute('eddie')).to.equal('&ndash;');
    });
  });

  describe('DetailDescription', function () {
    it('returns the description', function () {
      var el;

      el = document.createElement('div');
      el.innerHTML = view.getDetailDescription();

      expect(el.querySelectorAll('p').length).to.equal(2);
    });
  });

  describe('getDetailDownload', function () {
    it('returns list of downloads', function () {
      var el;

      el = document.createElement('div');
      el.innerHTML = view.getDetailDownload();

      expect(el.querySelectorAll('li').length).to.equal(5);
    });
  });

  describe('getData', function () {
    it('returns the attribute object', function () {
      var data;

      data = {
        'attributes': {
          'test': 'yes'
        }
      };

      expect(view.getData(data)).to.deep.equal({'test': 'yes'});
    });
    it('returns an empty object when the attribute object does not exist', function () {
      var data;

      data = null;

      expect(view.getData(data)).to.deep.equal({});
    });
  });

  describe('getDetailSummary', function () {
    it('returns markup for summary section', function () {
      var el;

      el = document.createElement('div');
      el.innerHTML = view.getDetailSummary();

      expect(el.querySelectorAll('dl').length).to.equal(1);
      expect(el.querySelectorAll('dt').length).to.equal(3);
      expect(el.querySelectorAll('dd').length).to.equal(3);
    });
  });

  describe('getDetailMap', function () {
    it('loads image when event is more than two years old', function () {
      var data,
          view;

      data = {
        'attributes': {
          'objectid':81,
          'fire':'Junkins Fire',
          'lat':38.159999999999997,
          'lon':-105.09999999999999,
          'location':'Pike and San Isabel National Forest, CO',
          'date': 0,
          'size':74,
          'mapimage':'20161017_junkins'
        }
      };

      view = DetailView({
        el: document.createElement('div'),
        data: data
      });

      expect(view.detailMapEl.classList.contains('detail-map-image')).to.be.true;
      expect(view.detailMapEl.classList.contains('detail-map-leaflet')).to.be.false;

      view.destroy();
    });

    it('loads map when event is less than two years old', function () {
      var data,
          view;

      data = {
        'attributes': {
          'objectid':81,
          'fire':'Junkins Fire',
          'lat':38.159999999999997,
          'lon':-105.09999999999999,
          'location':'Pike and San Isabel National Forest, CO',
          'date': new Date().getTime(),
          'size':74,
          'mapimage':'20161017_junkins'
        }
      };

      view = DetailView({
        el: document.createElement('div'),
        data: data
      });

      expect(view.detailMapEl.classList.contains('detail-map-image')).to.be.false;
      expect(view.detailMapEl.classList.contains('detail-map-leaflet')).to.be.true;

      view.destroy();
    });
  });

});

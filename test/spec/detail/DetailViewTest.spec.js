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
    //'date':1476662400000,
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
});

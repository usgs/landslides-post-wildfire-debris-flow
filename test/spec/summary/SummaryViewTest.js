/* global chai, describe, it */
'use strict';

var SummaryView = require('summary/SummaryView');

var expect = chai.expect;

describe('SummaryView', function () {

  describe('Constructor', function () {
    it('Can be defined', function () {
      /* jshint -W030 */
      expect(SummaryView).not.to.be.undefined;
      /* jshint +W030 */
    });

    it('Can be created and destroyed', function () {
      var view = SummaryView({});
      view.destroy();
    });
  });

});

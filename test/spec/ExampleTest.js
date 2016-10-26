/* global chai, describe, it */
'use strict';

var Xhr = require('util/Xhr');


var expect = chai.expect;


describe('ExampleTest', function () {
  describe('test framework', function () {

    it('includes chai', function () {
      expect(typeof chai).to.equal('object');
    });

    it('includes sinon', function () {
      expect(typeof sinon).to.equal('object');
    });

    it('has access to "etc" data', function (done) {
      Xhr.ajax({
        url: '/data.json',
        success: function (data) {
          expect(data.test).to.equal('Hello World');
          done();
        },
        error: function () {
          done(false);
        }
      });
    });

  });
});

/* global mocha */
'use strict';


mocha.setup('bdd');


// Add each test class here as they are implemented
require('./spec/summary/SummaryFireLayerTest.spec');
require('./spec/summary/SummaryMapViewTest.spec');
require('./spec/summary/SummaryViewTest.spec');


if (window.mochaPhantomJS) {
  window.mochaPhantomJS.run();
} else {
  mocha.run();
}

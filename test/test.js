/* global mocha */
'use strict';


mocha.setup('bdd');


// Add each test class here as they are implemented
require('./spec/summary/SummaryFireLayerTest.spec');
require('./spec/summary/SummaryMapViewTest.spec');
require('./spec/summary/SummaryViewTest.spec');

require('./spec/detail/DetailFireLayerTest.spec');
require('./spec/detail/DetailMapViewTest.spec');
require('./spec/detail/DetailViewTest.spec');


if (window.mochaPhantomJS) {
  window.mochaPhantomJS.run();
} else {
  mocha.run();
}

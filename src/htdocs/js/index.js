'use strict';

var SummaryView = require('summary/SummaryView');


var view;

view = SummaryView({
  el: document.querySelector('#application')
});
view.render();

new Promise(function (/*resolve, reject*/) {
  // TODO, make request for all wildfires to ArcGIS web service
}).then(function () {
  // TODO, pass collection of wildfires to SummaryView
});

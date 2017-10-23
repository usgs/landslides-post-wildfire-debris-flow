'use strict';

var SummaryView = require('summary/SummaryView'),
    Xhr = require('util/Xhr');


var url,
    view;

url = 'https://earthquake.usgs.gov/arcgis/rest/services/ls/pwfdf_locations/' +
    'MapServer/0/query?f=json&outfields=*&returnGeometry=false&where=1%3D1';

Xhr.ajax({
  url: url,
  success: function (data) {
    var json;

    json = JSON.parse(data);
    view = SummaryView({
      el: document.querySelector('#application'),
      data: json.features
    });
    view.render();
  },
  error: function (err) {
    document.querySelector('#application').innerHTML =
      '<p class="alert error">' +
        'Failed to download post-wildfire debris flow data.' +
      '</p>';
    console.log(err);
    console.log(err.stack);
  }
});

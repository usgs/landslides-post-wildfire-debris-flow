'use strict';

var SummaryView = require('summary/SummaryView'),
    Xhr = require('util/Xhr');


var url;

url = 'https://earthquake.usgs.gov/arcgis/rest/services/ls/pwfdf_locations/' +
    'MapServer/0/query?f=json&outfields=*&returnGeometry=false&where=1%3D1';

Xhr.ajax({
  url: url,
  success: function (data) {
    var json,
        view;

    try {
      json = JSON.parse(data);
    } catch (e) {
      json = data;
    }

    view = SummaryView({
      el: document.querySelector('#application'),
      data: json.features
    });
    view.render();
  },
  error: function (err) {
    document.querySelector('#application').innerHTML =
      '<p class="alert error">' +
        'Failed to download post-wildfire debris flow data. We are working ' +
        'to fix this issue. Please check back at a later time.' +
      '</p>';
    console.log(err);
  }
});

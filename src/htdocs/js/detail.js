/* global Objectid */
'use strict';

var DetailView = require('detail/DetailView'),
    Xhr = require('util/Xhr');


var url;

url = 'https://earthquake.usgs.gov/arcgis/rest/services/ls/pwfdf_locations/' +
    'MapServer/0/query?f=json&outfields=*&returnGeometry=false&objectIds=';

Xhr.ajax({
  url: url + Objectid,
  success: function (data) {
    var json,
        view;

    json = JSON.parse(data);
    view = DetailView({
      el: document.querySelector('#application'),
      data: json.features[0] || {}
    });
    view.render();
  },
  error: function (error) {
    document.querySelector('#application').innerHTML =
      '<p class="alert error">' +
        'Failed to download post-wildfire debris flow data.' +
      '</p>';
    console.log(error);
    console.log(error.stack);
  }
});

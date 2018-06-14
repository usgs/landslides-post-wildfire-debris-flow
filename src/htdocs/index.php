<?php

if (!isset($TEMPLATE)) {
  // template functions
  include_once 'functions.inc.php';

  $TITLE = 'Emergency Assessment of Post-Fire Debris-Flow Hazards';
  $HEAD = '
    <link rel="stylesheet" href="css/index.css"/>
    <link rel="stylesheet" href="/lib/leaflet-0.7.7/leaflet.css"/>
  ';
  $NAVIGATION = true;
  $FOOT = '
    <script src="/lib/leaflet-0.7.7/leaflet.js"></script>
    <script src="js/index.js"></script>
  ';

  include 'template.inc.php';
}

?>

<p class="summary-intro">
  Wildfire can significantly alter the hydrologic response of a 
  watershed to the extent that even modest rainstorms can produce 
  dangerous flash floods and debris flows. The USGS conducts 
  post-fire debris-flow hazard assessments for select fires in the 
  Western U.S. We use geospatial data related to basin morphometry, 
  burn severity, soil properties, and rainfall characteristics to 
  estimate the probability and volume of debris flows that may 
  occur in response to a design storm.
</p>

<div id="application">
  <noscript>
  <p>
    <a href="https://www.google.com/search?q=javascript">
      This page requires javascript to load the list of events.
    </a>
  </p>
  </noscript>
</div>

<div class="summary-links">
  <h3>Contact Us</h3>
  <ul>
    <li>
      Dennis Staley
      (<a href="mailto:dstaley@usgs.gov">dstaley@usgs.gov</a>)
    </li>
    <li>
      Jason Kean
      (<a href="mailto:jwkean@usgs.gov">jwkean@usgs.gov</a>)
    </li>
  </ul>

  <h3>Related Links</h3>
  <ul>
    <li>
      <a href="https://landslides.usgs.gov/hazards/warningsys.php">
        Early Warning System
      </a>
    </li>
  </ul>

  <h3>GIS Service Information</h3>
  <ul>
    <li>
      <a href="https://earthquake.usgs.gov/arcgis/rest/services/ls/">
        Post-Fire Debris-Flow Hazards GIS Services
      </a>
    </li>
    <li>
      <a href="https://github.com/usgs/hazdev-gis/blob/master/documentation.md">
        Landslides GIS Server Documentation
      </a>
    </li>
  </ul>
</div>

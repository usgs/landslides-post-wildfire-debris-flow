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

<p class="alert info">
  The maps below depict the likelihood of debris-flow generation and estimates of flow magnitude in locations where debris flows initiate. The models do not predict downstream impacts, potential debris-flow runout paths, and the areal extent of debris-flow or flood inundation.<br /><br />

  For information on what to do if you live in a recently-burned area where debris flows are possible, and there is a rainstorm - before, during, and after, download the
  <a href="https://www.wrh.noaa.gov/lox/hydrology/files/DebrisFlowSurvivalGuide.pdf">
    National Weather Service
    Post Wildfire Flash Flood and Debris Flow Guide
    (PDF 7.2 MB)
  </a>
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
      <a href="https://www.usgs.gov/natural-hazards/landslide-hazards/science/early-warning-system">
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

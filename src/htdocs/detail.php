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
    <script>
      var Objectid = ' . intval($_GET['objectid']) . ';
    </script>
    <script src="/lib/leaflet-0.7.7/leaflet.js"></script>
    <script src="js/detail.js"></script>
  ';

  include 'template.inc.php';
}
?>

<div class="alert info">
  <p>
    The maps below depict the likelihood of debris-flow generation and estimates of flow magnitude in locations where debris flows initiate. The models <strong>do not predict downstream impacts, potential debris-flow runout paths, and the areal extent of debris-flow or flood inundation.</strong>
  </p>
  <p>
    For information on what to do if you live in a recently-burned area where debris flows are possible, and there is a rainstorm - before, during, and after, download the <a href="https://www.wrh.noaa.gov/lox/hydrology/files/DebrisFlowSurvivalGuide.pdf"> National Weather Service Post Wildfire Flash Flood and Debris Flow Guide (PDF 7.2 MB).</a>
  </p>
</div>

<div id="application">
  <noscript>
  <p>
    <a href="https://www.google.com/search?q=javascript">
      This page requires javascript.
    </a>
  </p>
  </noscript>
</div>

<?php

if (!isset($TEMPLATE)) {
  // template functions
  include_once 'functions.inc.php';

  // defines the $CONFIG hash of configuration variables
  include_once '../conf/config.inc.php';

  $TITLE = 'Emergency Assessment of Post-Fire Debris-Flow Hazards';
  $HEAD = '<link rel="stylesheet" href="css/index.css"/>';
  $FOOT = '<script src="js/index.js"></script>';

  include 'template.inc.php';
}

?>

<div id="application">
  <noscript>
    <a href="https://www.google.com/search?q=javascript">
      This page requires javascript.
    </a>
  </noscript>
</div>

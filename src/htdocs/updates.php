<?php
if (!isset($TEMPLATE)) {
  $TITLE = "Model Updates";
  $NAVIGATION = true;
  include 'template.inc.php';
}
?>
<div>
  <p>
    <b>June 2016</b> - Post-fire debris-flow likelihood estimates are now made
    with an updated logistic regression model equation.  Additional details
    concerning the new equation, model database, and improvements in model
    predictions from previous iterations of the likelihood model can be found
    here (link to OFR and/or geomorph paper).
  </p>
  <p>
    <b>September 2015</b> - The analysis methods have been updated to now make
    calculations and output the results in the UTM NAD83 Coordinate System
    local to the burn area.  This update serves two purposes.  First, it allows
    dissemination of data to end-users in their native reference system.
    Second, it allows for improved accuracy in our calculations through better
    preservation of areas and lengths in the input data.This update is
    effective as of 09/10/2015 and will be a part of all future model runs.
  </p>
</div>

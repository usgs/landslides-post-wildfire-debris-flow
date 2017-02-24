<?php
// site search url, leave blank for all usgs
$SITE_URL = 'https://landslides.usgs.gov';
// navigation above search, below section navigation
$SITE_SITENAV =
  '<a href="/hazards/">Hazards</a>' .
  '<a href="/monitoring/">Monitoring</a>' .
  '<a href="/state_local/">State &amp; Local</a>' .
  '<a href="/learn/">Learn</a>' .
  '<a href="/research/">Research</a>';
// at bottom of page
$SITE_COMMONNAV =
  navItem(($SITE_URL), 'Home') .
  navItem('/aboutus/', 'About Us') .
  navItem('/contactus/', 'Contact Us') .
  navItem('/legal.php', 'Legal');
$HEAD =
// site theme, should use a site root-relative URL
  '<link rel="stylesheet" href="/theme/site/landslides/index.css"/>' .
// page head content
  ($HEAD ? $HEAD : '') .
// description meta
  '<meta name="description" content="' .
      'USGS Landslide Hazards Program, responsible for monitoring, ' .
      'reporting, and researching landslides and landslide hazards' .
    '"/>' .
// keywords meta
  '<meta name="keywords" content="' .
      'landslide, landslides, mudflow, erosion' .
    '"/>' .
// universal analytics (should be last in $HEAD)
  '<script id="_fed_an_ua_tag" async="async" src="' .
      '/lib/Universal-Federated-Analytics-Min.1.0.js' .
      '?agency=DOI&amp;subagency=USGS&amp;pua=UA-7320779-2' .
      '"></script>';
// comments and questions default
if (!isset($CONTACT)) {
  $CONTACT = 'lisa@usgs.gov';
}
$CONTACT_URL = 'mailto:{CONTACT}?subject=LHP%20Website%20Email%20';
?>

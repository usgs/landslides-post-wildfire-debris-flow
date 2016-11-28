<?php
  // Author: Lisa Wald
  // Contact: Dennis Staley,
  // Last modified: 07/25/2016, Lisa Wald
    if (!isset($TEMPLATE)) {
      $TITLE = 'Scientific Background';
      $NAVIGATION = true;
      include 'template.inc.php';
    }
?>
<div>
  <p>
    The preliminary hazard assessment relies upon empirical models to estimate
    the likelihood and volume of debris flows for selected basins in response
    to a design storm. Beginning in 2016, the empirical models are based upon
    historical debris-flow occurrence and magnitude data, rainfall storm
    conditions, terrain and soils information, and burn-severity data from
    recently burned areas (Staley et al., 2016a, 2016b). Hazard assessments for
    fires prior to May 2016 relied upon an earlier set of empirical methods
    described <a href="/hazards/postfire_debrisflow/background2010.php">here
    </a>.
  </p>
  <p>
    Post-fire debris-flow likelihood, volume, and combined hazards are
    estimated at both the drainage-basin scale and in a spatially distributed
    manner along the drainage network within each basin. The characteristics of
    basins affected by the fire were calculated using a geographic information
    system (GIS). Debris-flow likelihood and volume were estimated for each
    basin outlet as well as along the upstream drainage networks (pixels where
    the contributing area is greater than or equal to 0.02 km<sup>2</sup>).
    Independent variable values were calculated for each pixel along the
    drainage network and summarized at the stream segment scale to obtain
    estimates of debris-flow likelihood and volume.
  </p>

  <h4>Likelihood Model</h4>
  <p>
    The likelihood of a debris-flow in response to a given peak 15-minute
    rainfall intensity are based upon a logistic regression approach, which
    combines the following two equations: <br>
    (1) P = e<sup>x</sup> / (1 + e<sup>x</sup>),<br> <br>Where
  </p>
  <ul>
    <li>
      P is the probability of debris-flow occurrence in fractional form, and
    </li>
    <li>
      e<sup>x</sup> is the exponential function where e represents the
      mathematical constant 2.718.
    </li>
  </ul>

  <p>
    For recently burned areas in southern California, equation 2 is used to
    calculate x:<br/>

    <br>(2) x = -3.63 + (0.41 &#215; X1R) + (0.67 &#215; X2R) + (0.7 &#215; X3R)

    <br>Where
  </p>
    <ul>
      <li>
        X1R is the proportion of upslope area in burned area reflectance class
        (BARC) Class 3 or 4 with gradients &ge;23&deg;, multiplied by the peak
        15-minute rainfall accumulation of the design storm
        (in millimeters [mm]),
      </li>
      <li>
        X2R is the average differenced normalized burn ratio (dNBR) of the
        upslope area, multiplied by the peak 15-minute rainfall accumulation of
        the design storm (in millimeters [mm]),
      </li>
      <li>
        X3R is the soil KF-Factor (Schwartz and Alexander, 1995) of the upslope
        area, multiplied by the peak 15-minute rainfall accumulation of the
        design storm (in millimeters [mm]).
      </li>
    </ul>
  <p>
    Likelihood values predicted by the equation potentially range from 0 (least
    likely) to 1 (most likely). The predicted likelihood values are assigned to
    1 of 5 equal interval classes for cartographic display, and are represented
    as a percentage likelihood (rather than a ratio).
  </p>

  <h4>Volume Model</h4>
  <p>
    Debris-flow volumes both at the basin outlet and along the drainage network
    are predicted using a multiple linear regression model (Gartner and others,
    2014). The multiple linear regression models are used to estimate the
    volume (V, in m3) of material that could issue from a point along the
    drainage network in response to a storm of a given rainfall intensity.
  </p>

  <p>
    Potential debris-flow volume is calculated with equation 4:<br/>

    <br>(3) ln(V) = 2.89 + (0.17 &#215; sqrt(ElevRange)) +
    (0.3 &times; ln(HM<sub>km</sub>)) + (0.47 &times; sqrt(i15))<br>
    <br>Where
  </p>

  <ul>
    <li>
      ElevRange is the range (maximum elevation–minimum elevation) of elevation
      values within the upstream watershed (in meters),
    </li>

    <li>
      HM<sub>km</sub> is the area upstream of the calculation point that
      was burned at high or moderate severity (in km<sup>2</sup>), and
    </li>

    <li>
      i15 is the spatially-averaged peak 15-min rainfall intensity for the
      design storm in the upstream watershed (in mm/h).
    </li>
  </ul>
  <p>
    Volume estimates were classified in order of magnitude scale ranges
    0–1,000 m<sup>3</sup>; 1,000–10,000 m<sup>3</sup>;
    10,000–100,000 m<sup>3</sup>; and greater than 100,000 m<sup>3</sup> for
    cartographic display.
  </p>

  <h4>Combined Hazard</h4>
  <p>
    Debris-flow hazards from a given basin can be considered as the combination
    of both probability and volume. For example, in a given setting, the most
    hazardous basins will show both a high probability of occurrence and a
    large estimated volume of material. Slightly less hazardous would be basins
    that show a combination of either relatively low probabilities and larger
    volume estimates or high probabilities and smaller volume estimates. The
    lowest relative hazard would be for basins that show both low probabilities
    and the smallest volumes.
  </p>
  <p>
    We combined the results of the probability and the volume maps following the
    methods of Cannon and others (2010). A rank of 1 to 5 (with 5 being the
    highest) is assigned to each of the probability classes, and a rank of 1 to
    4 is assigned to each of the volume classes. The ranks of the probability
    and volume classes are then added together to produce a map of the combined
    relative hazard ranking for each basin (with 9 being the highest combined
    hazard).
  </p>

  <h4>References</h4>
  <ul class="referencelist">
    <li>
      Gartner J.E., Cannon S.H., Santi P.M., 2014 Empirical models for
      predicting volumes of sediment deposited by debris flows and
      sediment-laden floods in the transverse ranges of southern California,
      Engineering Geology 176:45-56, doi:http://dx.doi.org/10.1016/j.
      enggeo.2014.04.008
    </li>
    <li>
      Schwartz, G.E., and Alexander, R.B., 1995, Soils data for the conterminous
      United States derived from the NRCS State Soil Geographic (STATSGO)
      Database: U.S. Geological Survey Open-File Report 95–449, accessed July
      2013, article
      <a href="http://water.usgs.gov/GIS/metadata/usgswrd/XML/ussoils.xml">
      http://water.usgs.gov/GIS/metadata/usgswrd/XML/ussoils.xml</a>.
    </li>
    <li>
      Staley, D.M., Negri, J.A., Kean, J.W., Tillery, A.C., Youberg, A.M., 2016,
      Updated logistic regression equations for the calculation of post-fire
      debris-flow likelihood in the western United States: U.S. Geological
      Survey Open-File Report 2016-1106, 13 p., available at
      <a href="http://pubs.usgs.gov/of/2016/1106/">
      http://pubs.usgs.gov/of/2016/1106/</a>
    </li>
    <li>
      Verdin, K.L., Dupree, J.A., and Elliot, J.G., 2012, Probability and volume
      of potential postwildfire debris flows in the 2012 Waldo Canyon Burn Area
      near Colorado Springs, Colorado: U.S. Geological Survey Open-File Report
      2012–1158, 8 p., at <a href="http://pubs.usgs.gov/of/2012/1158/">
      http://pubs.usgs.gov/of/2012/1158/</a>.
    </li>
  </ul>
</div>

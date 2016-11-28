<?php
  // Author: Lisa Wald
  // Contact: Dennis Staley,
  // Last modified: 07/25/2016, Lisa Wald
    if (!isset($TEMPLATE)) {
      $TITLE = 'Scientific Background (Fires prior to 2016)';
      $NAVIGATION = true;
      include 'template.inc.php';
    }
?>
	<p>
		The preliminary hazard assessment relies upon empirical models to estimate
		the probability and volume of debris flows for selected basins in response
		to a design storm. The design storm is based on precipitation-frequency
		estimates for the burn area, which are used to estimate the storm recurrence
		interval (Bonnin and others, 2006; Miller and others, 1973). For example, a
		10-year recurrence interval rainstorm is expected to have a 10% chance of
		happening in any given year.
	</p>
	<p>
		The empirical models are based upon historical debris-flow occurrence and
		magnitude data, rainfall storm conditions, terrain and soils information,
		and burn-severity data from recently burned areas. Separate models have been
		developed for the regions of southern California (Rupert and others, 2008;
		Cannon, S.H., 2011, U.S. Geological Survey, unpublished data; Gartner, J.E.,
		2013, U.S. Geological Survey, unpublished data) and the intermountain western
		United States (Gartner and others, 2008; Cannon and others, 2010).
	</p>
	<p>
		Post-fire debris-flow probability, volume, and combined hazards are
		estimated at both the drainage-basin scale and in a spatially distributed
		manner along the drainage network within each basin. The characteristics of
		basins affected by the fire were calculated using a geographic information
		system (GIS). Debris-flow probability and volume were estimated for each
		basin outlet as well as along the upstream drainage networks (pixels where
		the contributing area is greater than or equal to 0.02 km<sup>2</sup>) using
		a method that has been applied in recently burned areas (for example, Verdin
		and others, 2012). Independent variable values were calculated for each
		pixel along the drainage network and summarized at the stream segment scale
		to obtain estimates of debris-flow probability and volume.
	</p>

<h2>Probability Model</h2>
<p>
	Probability estimates are based upon logistic regression models derived from
	region-specific databases. This model is designed to predict the probability
	of debris-flow occurrence at a point along the drainage network in response to
	a given storm by combining the following two equations:<br> (1) P =
	e<sup>x</sup> / (1 + e<sup>x</sup>),<br>
	<br>Where
</p>
	<ul>
		<li>P is the probability of debris-flow occurrence in fractional form,
				and</li>
		<li>e<sup>x</sup> is the exponential function where e represents the
				mathematical constant 2.718.</li>
	</ul>

<p>
	For recently burned areas in southern California, equation 2 is used to calculate x:<br/>

	<br>(2) x = -5.22 + (0.003 &#215 ElevRange) + (0.008 &#215 HM50<sub>pct</sub>) +
			(0.024 &#215 bslp<sub>pct</sub>) + (-0.007 &#215 CC<sub>pct</sub>) + (0.105 &#215 i30)<br>
	<br>Where
</p>
	<ul>
		<li>ElevRange - is the range (maximum elevation–minimum elevation) of elevation
				values upstream of the point (in meters),
		</li>
		<li>HM50<sub>pct</sub> - is the percentage of the upstream watershed that was burned
				at high or moderate severity and has slope values in excess of 50
				percent (in percent),
		</li>
		<li>bslp<sub>pct</sub> - is the average gradient of the burned pixels upslope of the
				point (in percent),
		</li>
		<li>CC<sub>pct</sub> - is the average clay content of the soils in the basin (in
				percent) (Schwartz and Alexander, 1995), and
		</li>
		<li>i30 - is the spatially averaged upslope 30-min rainfall intensity for
				the design storm (in millimeters per hour [mm/h]).
		</li>
	</ul>
<p>
	Probabilities predicted by the equation potentially range from 0 (least likely)
	to 100 percent (most likely). The predicted probabilities are assigned to 1 of 5
	equal (20 percent) interval classes for cartographic display.
</p>
<p>
	For recently burned areas in the intermountain western United States,
	equation 3 is used to calculate x:<br/>

	<br>(3) x = -0.7 + (0.03 &#215 Slp30<sub>pct</sub>) - (1.6 &#215 Rugged) + (0.06 &#215 HM<sub>pct</sub>) +
			(0.2 &#215 CC<sub>pct</sub>) – (0.4 &#215 LL<sub>pct</sub>) + (0.07 &#215 i60)<br>
	<br>Where
</p>

<ul>
	<li>Slp30<sub>pct</sub> – is the percentage area of the upstream area with slope gradients
			in excess of 30 percent (in percent),
	</li>
	<li>Rugged – is the upslope ruggedness, which is equal to the total relief
			(in meters) of the upstream area divided by the square root of the total
			upslope area above the pixel (in square meters),
	</li>
	<li>HM<sub>pct</sub> - is the percentage of the upstream watershed that was burned at high
			or moderate severity (in percent),
	</li>
	<li>CC<sub>pct</sub> - is the average clay content of the soils in the basin (in percent)
			(Schwartz and Alexander, 1995),
	</li>
	<li>LL<sub>pct</sub> - is the average liquid limit of the soils in the basin (in percent)
			(Schwartz and Alexander, 1995), and
	</li>
	<li>i60 - is the spatially averaged upslope 60-min rainfall intensity for the
			design storm (in millimeters per hour [mm/h]).
	</li>
</ul>

<h2>Volume Model</h2>
<p>
	Debris-flow volumes both at the basin outlet and along the drainage network
	are predicted using multiple linear regression models for region-specific
	databases. The multiple linear regression models are used to estimate the
	volume (V, in m<sup>3</sup>) of material that could issue from a point along
	the drainage network in response to a storm of a given rainfall intensity.
</p>

<p>
	For recently burned areas in southern California, debris-flow volume is calculated
	with equation 4:<br/>

  <br>(4) ln(V) = 2.89 + (0.17 &#215; sqrt(ElevRange)) + (0.3 &times; ln(HM<sub>km</sub>) +
  (0.47 &times; sqrt(i15))<br>
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
			i15 is the spatially-average peak 15-min rainfall intensity for the
			design storm in the upstream watershed (in mm/h).
		</li>
</ul>
<p>
	Volume estimates were classified in order of magnitude scale ranges
	0–1,000 m<sup>3</sup>; 1,000–10,000 m<sup>3</sup>; 10,000–100,000 m<sup>3</sup>;
	and greater than 100,000 m<sup>3</sup> for cartographic display.
</p>
<p>
	For recently burned areas in the intermountain western United States, debris-flow
	volume is calculated with equation 5:<br/>

<br>(5) ln(V) = 7.5 + (0.6 &#215; ln(Slp30<sub>km</sub>)) + (0.7 &#215; sqrt(HM<sub>km</sub>)) + (0.2 &#215; sqrt(r60))<br>
<br>Where
</p>

<ul>
	 <li>Slp30<sub>km</sub> is the area upstream that has slope gradients in excess of 30 percent (in km<sup>2</sup>),
	</li>
<li>HM<sub>km</sub> is the area upstream of the calculation point that was burned at high or
		moderate severity (in km<sup>2</sup>), and
	</li>
<li>r60 is the spatially averaged 60-minute rainfall accumulation for the design storm
		in the upstream watershed (in mm).
</li>
</p>

<h2>Combined Hazard</h2>
<p>
	Debris-flow hazards from a given basin can be considered as the combination of
	both probability and volume. For example, in a given setting, the most
	hazardous basins will show both a high probability of occurrence and a large
	estimated volume of material. Slightly less hazardous would be basins that
	show a combination of either relatively low probabilities and larger volume
	estimates or high probabilities and smaller volume estimates. The lowest
	relative hazard would be for basins that show both low probabilities and the
	smallest volumes.
</p>
<p>
	We combined the results of the probability and the volume maps following the
	methods of Cannon and others (2010). A rank of 1 to 5 (with 5 being the
	highest) is assigned to each of the probability classes, and a rank of 1 to 4
	is assigned to each of the volume classes. The ranks of the probability and
	volume classes are then added together to produce a map of the combined
	relative hazard ranking for each basin (with 9 being the highest combined
	hazard).
</p>

<h2>References</h2>
<ul class="referencelist">
	<li>
		Bonnin, G.M., Martin, D., Lin, B., Parzybok, T., Yekta, M., and Riley, D.,
		2006,Precipitation frequency atlas of the United States: Silver Spring, Md.,
		National Weather Service, National Oceanic and Atmospheric Administration
		(NOAA) atlas 14, v. 1, version 5, accessed July 30, 2013, at
		<a
		href="http://hdsc.nws.noaa.gov/hdsc/pfds/">http://hdsc.nws.noaa.gov/hdsc/pfds/</a>.
	</li>
	<li>
		Cannon, S.H., Gartner, J.E., Rupert, M.G., Michael, J.A., Rea, A.H., Parrett, C.,
		2010. Predicting the probability and volume of postwildfire debris flows in the
		intermountain western United States. Geological Society of America Bulletin 122, 127-144.
	</li>
	<li>
		Gartner, J.E., Cannon, S.H., Santi, P., and Dewolfe, V., 2008, Empirical models
		to predict the volumes of debris flows generated by recently burned basins in
		the western U.S.: Geomorphology, v. 96, no. 3-4, p. 339–354.
	</li>
	<li>
		Miller, J.F., Frederick, R.H., and Tracey, R.J., 1973, Precipitation frequency atlas
		of the western United States: United States: Silver Spring, Md., National Weather Service,
		National Oceanic and Atmospheric Administration (NOAA) atlas 2.
	</li>
	<li>
		Rupert, M.G., Cannon, S.H., Gartner, J.E., Michael, J.A., and Helsel, D.R.,
		2008, Using logistic regression to predict the probability of debris flows in
		areas burned by wildfires, southern California, 2003–2006: U.S. Geological
		Survey Open-File Report 2008–1370, 20 p.,
		<a href="http://pubs.usgs.gov/of/2008/1370/">http://pubs.usgs.gov/of/2008/1370/</a>.
	</li>
	<li>
		Schwartz, G.E., and Alexander, R.B., 1995, Soils data for the conterminous
		United States derived from the NRCS State Soil Geographic (STATSGO) Database:
		U.S. Geological Survey Open-File Report 95–449, accessed July 2013, at
		<a href="http://water.usgs.gov/GIS/metadata/usgswrd/XML/ussoils.xml">
		http://water.usgs.gov/GIS/metadata/usgswrd/XML/ussoils.xml</a>.
	</li>
	<li>
		Verdin, K.L., Dupree, J.A., and Elliot, J.G., 2012, Probability and volume of
		potential postwildfire debris flows in the 2012 Waldo Canyon Burn Area near
		Colorado Springs, Colorado: U.S. Geological Survey Open-File Report 2012–1158,
		8 p., at <a href="http://pubs.usgs.gov/of/2012/1158/">http://pubs.usgs.gov/of/2012/1158/</a>.
	</li>
</ul>
</div>

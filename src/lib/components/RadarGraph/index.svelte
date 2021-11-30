<script>
	// 	Note: Due to REPL limitations, full responsiveness may not work here. Download the example from here or from the website (https://layercake.graphics/example/Radar) and run locally to get all features.
	import { LayerCake, Svg } from 'layercake';
	import Radar from './Radar.svelte';
	import RadialAxis from './RadialAxis.svelte';
	import data from './radarScores.js';
	const seriesKey = 'name';
	const xKey = ['fastball', 'change', 'slider', 'cutter', 'curve'];
	const seriesNames = Object.keys(data[0]).filter(d => d !== seriesKey);
	data.forEach(d => {
		seriesNames.forEach(name => {
			d[name] = +d[name];
		});
	});
	export let small = false;
	export let xKeySmall = ['fbl', 'chg', 'sld', 'cut', 'crv'];
</script>
<style>
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
	.chart-container {
		width: 100%;
		height: 50%; 
	}
</style>
<div class="chart-container">
	<LayerCake
		padding={{ top: 0, right: 0, bottom: 0, left: 0 }}
		x={xKey}
		xDomain={[0, 10]}
		xRange={({ height }) => [0, height / 2]}
		data={data}
	>
		<Svg>
			<RadialAxis {small} {xKeySmall}/>
			<Radar/>
		</Svg>
	</LayerCake>
</div>


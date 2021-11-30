<script>
	// 	Note: Due to REPL limitations, full responsiveness may not work here. Download the example from here or from the website (https://layercake.graphics/example/Radar) and run locally to get all features.
	import { LayerCake, Svg } from 'layercake';
	import Radar from './Radar.svelte';
	import RadialAxis from './RadialAxis.svelte';
	import tennisData from '$lib/playerData.js';
	export let player;
	export let match;
	const statObject = tennisData[player].matches[match].stats.overall;
	const xKey = Object.keys(statObject).slice(1);
	export let color = tennisData[player].color;
	export let small = false;
	export let xKeySmall = xKey.map(key => (key.charAt(0) + key.split('').filter(x => x === x.toUpperCase()).join('')).toLowerCase());
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
		xDomain={[0, 100]}
		xRange={({ height }) => [0, height / 2]}
		data={[statObject]}
	>
		<Svg>
			<RadialAxis {small} {xKeySmall}/>
			<Radar {color}/>
		</Svg>
	</LayerCake>
</div>


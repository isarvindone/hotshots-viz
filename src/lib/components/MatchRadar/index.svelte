<script>
  import { LayerCake, Svg } from "layercake";
  import Radar from "./Radar.svelte";
  import RadialAxis from "./RadialAxis.svelte";
  import db from "$lib/db.js";
  export let player;
  export let match;
  const xKey = Object.keys(
    db.playerData[player].matches[match].stats.overall
  ).slice(1);
  export let color = db.playerData[player].color;
  export let small = false;
  export let xKeySmall = xKey.map((key) =>
    (
      key.charAt(0) +
      key
        .split("")
        .filter((x) => x === x.toUpperCase())
        .join("")
    ).toLowerCase()
  );
</script>

<div class="chart-container">
  <LayerCake
    padding={{ top: 10, right: 5, bottom: 10, left: 15 }}
    x={xKey}
    xDomain={[0, 100]}
    xRange={({ height }) => [0, height / 2]}
    data={[db.playerData[player].matches[match].stats.overall]}
  >
    <Svg>
      <RadialAxis {small} {xKeySmall} />
      <Radar {color} />
    </Svg>
  </LayerCake>
</div>

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

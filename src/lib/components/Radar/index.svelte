<script>
  import { LayerCake, Svg } from "layercake";
  import { findById, groupBy, summarizeColor } from "$lib/helpers";
  import Plot from "./plot.svelte";
  import Axis from "./axis.svelte";
  import db from "$lib/db";
  export let list;
  $: localList = [...list];
  let data = db.playerData;
  $: stats = groupBy(
		localList.map((match) => {
        let obj = match.stats.overall;
        let playerColor = findById(match.pid)[0].color;
        obj["color"] = playerColor;
        return obj;
      }),
      "color"
    )
  $: summary = Object.keys(stats).map(color => summarizeColor(color, stats));
  $: console.log("stats", stats);
  $: console.log("summary", summary);
  const xKey = Object.keys(data[0].matches[0].stats.overall).slice(1);
</script>

<div class="chart-container">
  <LayerCake
    padding={{ top: 10, right: 5, bottom: 10, left: 15 }}
    x={xKey}
    xDomain={[0, 100]}
    xRange={({ height }) => [0, height / 2]}
    data={summary}
  >
    <Svg>
      <Axis small={false} xKeySmall={[]} />
      <Plot />
    </Svg>
  </LayerCake>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 50%;
  }
</style>

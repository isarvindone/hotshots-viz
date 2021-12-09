<script>
  import { getContext } from "svelte";
  import { line, curveLinearClosed } from "d3-shape";
  const { data, width, height, xGet, config } = getContext("LayerCake");
  $: angleSlice = (Math.PI * 2) / $config.x.length;
  $: path = line()
    .curve(curveLinearClosed)
    .x((d, i) => (isNaN(d) ? 1 : d * Math.cos(angleSlice * i - Math.PI / 2)))
    .y((d, i) => (isNaN(d) ? 1 : d * Math.sin(angleSlice * i - Math.PI / 2)));
  $: cx = (circleR, i) =>
    isNaN(circleR) ? 1 : circleR * Math.cos(angleSlice * i - Math.PI / 2);
  $: cy = (circleR, i) =>
    isNaN(circleR) ? 1 : circleR * Math.sin(angleSlice * i - Math.PI / 2);
</script>

<g transform="translate({$width / 2}, {$height / 2})">
  {#each $data as row}
    <!-- Draw a line connecting all the dots -->
    <path
      class="path-line"
      d={path($xGet(row))}
      stroke={row.color}
      fill={row.color}
      fill-opacity="0.5"
    />

    <!-- Plot each dots -->
    {#each $xGet(row) as circleR, i}
      <circle
        cx={cx(circleR, i)}
        cy={cy(circleR, i)}
        r="4.5"
        fill={row.color}
        stroke="#fff"
        stroke-width="1"
      />
    {/each}
  {/each}
</g>

<style>
  .path-line {
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2;
  }
</style>

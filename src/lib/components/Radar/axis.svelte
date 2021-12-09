<script>
  import { getContext } from "svelte";
  const { width, height, xScale, config } = getContext("LayerCake");
  export let linePaddingFactor = 1.1;
  export let labelPaddingFactor = 1.3;
  $: max = $xScale(100);
  $: angleSlice = (Math.PI * 2) / $config.x.length;
  const xSeries = $config.x.map((text) => {
    var result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  });
  function anchor(total, i) {
    if (i === 0 || i === total / 2) {
      return "middle";
    } else if (i < total / 2) {
      return "start";
    }
    return "end";
  }
  export let small;
  export let xKeySmall;
</script>

<g transform="translate({$width / 2}, {$height / 2})">
  <circle
    cx="0"
    cy="0"
    r={max}
    stroke="#ccc"
    stroke-width="1"
    fill="#CDCDCD"
    fill-opacity="0.1"
  />
  <circle
    cx="0"
    cy="0"
    r={max / 2}
    stroke="#ccc"
    stroke-width="1"
    fill="none"
  />
  {#each $config.x as label, i}
    <line
      x1="0"
      y1="0"
      x2={max * linePaddingFactor * Math.cos(angleSlice * i - Math.PI / 2)}
      y2={max * linePaddingFactor * Math.sin(angleSlice * i - Math.PI / 2)}
      stroke="#ccc"
      stroke-width="1"
      fill="none"
    />
    <text
      text-anchor={anchor($config.x.length, i)}
      dy="0.35em"
      font-size="12px"
      text-outline="#fff"
      transform="translate({max *
        labelPaddingFactor *
        Math.cos(angleSlice * i - Math.PI / 2)}, {max *
        labelPaddingFactor *
        Math.sin(angleSlice * i - Math.PI / 2)})"
      >{small ? xKeySmall[i] : xSeries[i]}</text
    >
  {/each}
</g>

<script>
  export let color;
  export let classes = "py-2 px-4";
  export let handleClick;
  export let inverted = false;
</script>

<button
  class="
    item
    inline-flex 
    items-center 
    {inverted ? `bg-${color}-500` : `bg-${color}-100`} 
    {inverted ? `text-white` : `text-${color}-700`} 
    font-semibold 
    rounded-lg 
    shadow-sm 
    focus:shadow-lg 
    {inverted ? `hover:bg-${color}-600` : `hover:bg-${color}-200`} 
    transition-all 
    focus:outline-none 
    border-2 
    {classes}
    "
  on:click={handleClick}
>
  <slot />
</button>

<style>
  .item:focus,
  .item:active {
    border-color: rgb(46, 111, 207);
  }
  .item:hover {
    border-color: rgb(46, 111, 207, 0.5);
  }
</style>

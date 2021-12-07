<script>
  import { slide } from "svelte/transition";
  import { findById, summarizeColor, groupBy, roundToTwo } from "$lib/helpers"; 
  import { selected } from "$lib/stores";
  import α from 'color-alpha';
  export let entry;
  let playerInfo = findById(entry[0])[0]; 
  let isOpen = false;
  $: localList = [...$selected];
  $: stats = groupBy(
		localList.map((match) => {
        let obj = match.stats.overall;
        let playerColor = findById(match.pid)[0].color;
        obj["color"] = playerColor;
        return obj;
      }),
      "color"
    )
  $: summary = Object.keys(stats).map(color => {
      if (color === playerInfo.color) 
        return summarizeColor(color, stats)
      return
    }).filter(x => x !== undefined);
  $: console.log("accordion summary",summary)
  const toggle = () => (isOpen = !isOpen);
</script>
<div tabindex="0" class="bg-white border-2 border-gray-200 shadow-md rounded-md m-2">
<button tabindex="-1" on:click={toggle} aria-expanded={isOpen} class="w-full">
    <div class="flex flex-col pb-2">
        <div class="flex flex-row">
            <div class="w-6 align-middle mt-1 ml-2">
                <svg
                width="20"
                height="35"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
              >
            </div>
            <div class="flex-grow">
                <div class="flex flex-row align-middle">
                    <div class="w-8 h-8 rounded-full m-2 mr-4 border-2" style="background-color: {α(playerInfo.color,.5)}; border-color: {playerInfo.color}">
                      <img class="rounded-full" src="{playerInfo.image}" alt="{playerInfo.image}">
                    </div> 
                    <span class="flex-shrink mt-2.5">{playerInfo.firstName} {playerInfo.lastName}</span>
                    <span class="flex-grow mt-2.5 text-sm text-right text-gray-900 pr-4"><span class="font-semibold">{roundToTwo(summary[0].result)}</span>% won</span>
            </div>
        </div>
    </div>
    <div class="flex flex-row ml-4">
        <span class="flex-shrink mt-2.5 text-sm font-normal text-gray-700">First Serve Percentage</span>
        <span class="flex-grow mt-2.5 text-sm text-right text-gray-900 pr-4 font-semibold">{roundToTwo(summary[0].firstServPerc)}%</span>  
    </div>  
    <div class="flex flex-row ml-4">
        <span class="flex-shrink mt-2.5 text-sm font-normal text-gray-700">Forehand Winner Percentage</span>
        <span class="flex-grow mt-2.5 text-sm text-right text-gray-900 pr-4 font-semibold">{roundToTwo(summary[0].fhWinPerc)}%</span>  
    </div>  
    <div class="flex flex-row ml-4">
        <span class="flex-shrink mt-2.5 text-sm font-normal text-gray-700">Backhand Winner Percentage</span>
        <span class="flex-grow mt-2.5 text-sm text-right text-gray-900 pr-4 font-semibold">{roundToTwo(summary[0].bhWinPerc)}%</span>  
    </div>  
    <div class="flex flex-row ml-4">
        <span class="flex-shrink mt-2.5 text-sm font-normal text-gray-700">Net Frequency</span>
        <span class="flex-grow mt-2.5 text-sm text-right text-gray-900 pr-4 font-semibold">{roundToTwo(summary[0].netFrequency)}</span>  
    </div>
    <div class="flex flex-row ml-4">
        <span class="flex-shrink mt-2.5 text-sm font-normal text-gray-700">Return in Play</span>
        <span class="flex-grow mt-2.5 text-sm text-right text-gray-900 pr-4 font-semibold">{roundToTwo(summary[0].returnInPlay)}</span>  
    </div>    
</button>
{#if isOpen}
  <ul transition:slide={{ duration: 300 }} class="bg-gray-50">
    {#each entry[1] as item}
    <hr class="mb-4"/>
    <li class="my-1">
        <div class="flex-grow">
            <div class="flex flex-row align-middle">
                <div class="w-12 h-12 rounded-lg m-1 mr-0 ml-4">
                  <img class="rounded-lg" src="./{item.tournamentInfo.tournament}.png" alt="{item.tournamentInfo.tournament} Image">
                </div> 
                <div class="flex flex-col flex-grow">
                    <div class="flex flex-row ml-4 font-medium">
                        <span class="flex-shrink mt-1.5">{item.tournamentInfo.tournament} <span class="text-sm">({item.tournamentInfo.surface})</span></span>
                        <span class="flex-grow mt-1.5 text-sm text-right text-gray-900 pr-4">{item.tournamentInfo.month} {item.tournamentInfo.year}</span>
                    </div>  
                    <div class="flex flex-row ml-4">
                        <span class="flex-shrink mt-1.5 text-sm font-normal text-gray-700">Played against <span class="font-medium">{item.tournamentInfo.opponent}</span></span>
                        <span class="flex-grow mt-1.5 text-sm text-right text-gray-900 font-semibold pr-4 font-semibold">
                            {#if item.stats.overall.result === "win"}
                                <span class="text-green-600">Won {item.tournamentInfo.round}</span>
                            {:else}
                                <span class="text-red-600">Lost {item.tournamentInfo.round}</span>
                            {/if}
                        </span>  
                    </div>  
                </div>
            </div>
    <div class="flex flex-row ml-4">
        <span class="flex-shrink mt-2.5 text-sm font-normal text-gray-700">First Serve Percentage</span>
        <span class="flex-grow mt-2.5 text-sm text-right text-gray-900 pr-4 font-semibold">{roundToTwo(item.stats.overall.firstServPerc)}%</span>  
    </div>  
    <div class="flex flex-row ml-4">
        <span class="flex-shrink mt-2.5 text-sm font-normal text-gray-700">Forehand Winner Percentage</span>
        <span class="flex-grow mt-2.5 text-sm text-right text-gray-900 pr-4 font-semibold">{roundToTwo(item.stats.overall.fhWinPerc)}%</span>  
    </div>  
    <div class="flex flex-row ml-4">
        <span class="flex-shrink mt-2.5 text-sm font-normal text-gray-700">Backhand Winner Percentage</span>
        <span class="flex-grow mt-2.5 text-sm text-right text-gray-900 pr-4 font-semibold">{roundToTwo(item.stats.overall.bhWinPerc)}%</span>  
    </div>  
    <div class="flex flex-row ml-4">
        <span class="flex-shrink mt-2.5 text-sm font-normal text-gray-700">Net Frequency</span>
        <span class="flex-grow mt-2.5 text-sm text-right text-gray-900 pr-4 font-semibold">{roundToTwo(item.stats.overall.netFrequency)}</span>  
    </div>
    <div class="flex flex-row ml-4 pb-5">
        <span class="flex-shrink mt-2.5 text-sm font-normal text-gray-700">Return in Play</span>
        <span class="flex-grow mt-2.5 text-sm text-right text-gray-900 pr-4 font-semibold">{roundToTwo(item.stats.overall.returnInPlay)}</span>  
    </div>  
    </li>
    {/each}
  </ul>
{/if}
</div>
<style lang="postcss">
button {
    @apply text-lg border-none bg-white block cursor-pointer m-0 py-2;
  }

  svg {
    transition: transform 0.2s ease-in;
  }

  [aria-expanded="true"] svg {
    transform: rotate(0.25turn);
  }
</style>

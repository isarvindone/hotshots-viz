<script>
  import db from "$lib/db";
  import α from "color-alpha";
  import Button from "$lib/components/Button.svelte";
  import { groupBy } from "$lib/helpers";
  import AccordionItem from "$lib/components/AccordionItem.svelte";
  import Radar from "$lib/components/Radar/index.svelte";
  import MatchRadar from "$lib/components/MatchRadar/index.svelte";
  import Svelecte, { addFormatter } from "svelecte";
  import { selected, players } from "$lib/stores.js";
  let matches = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let data = db.playerData;
  $: groupedList = groupBy([...$selected], "pid");
  let showSearch = false;
  let options = [...data].map((x) => {
    return {
      id: x.id,
      index: x.index,
      color: x.color,
      image: x.image,
      name: `${x.firstName} ${x.lastName}`,
    };
  });
  let value = null;
  $: bgColor = $selected.length > 0 ? "white" : "rgb(234,234,234)";
  function handleKeydown({ keyCode }) {
    if (keyCode !== 37 && keyCode !== 39 && keyCode != 32) return;
    const current = document.activeElement;
    if (keyCode === 32) current.click();
    const items = [...document.getElementsByClassName("item")];
    const currentIndex = items.indexOf(current);
    let newIndex;
    if (currentIndex === -1) {
      newIndex = 0;
    } else {
      if (keyCode === 37)
        newIndex = (currentIndex + items.length - 1) % items.length;
      else newIndex = (currentIndex + 1) % items.length;
    }
    current.blur();
    items[newIndex].focus();
  }
  function playerRenderer(item, isSelected) {
    if (isSelected) {
      return `<span>${item.name}</span>`;
    }
    return `
      <div class="flex flex-row align-middle">
      <div class="w-8 h-8 rounded-full m-2 mr-4 border-2" style="background-color: ${α(
        item.color,
        0.5
      )}; border-color: ${item.color}">
        <img class="rounded-full" src="${item.image}" alt="${item.image}">
      </div> 
      <div class="flex-grow mt-2.5">${item.name}</div>`;
  }
  addFormatter("player-block", playerRenderer);
  function onChange(event) {
    $players = Array.from(new Set([...$players, event.detail.index]));
    showSearch = false;
  }
  function removePlayer(index) {
    $players = $players.filter((player) => player !== index);
  }
  function handlePlayerClick(player) {
    let selectedLength = [...data[player].matches].filter(
      (x) => x.selected !== false
    ).length;
    for (let i = 0; i < matches.length; i++) {
      data[player].matches[i].selected =
        selectedLength < matches.length ? true : false;
      let matchDiv = document.getElementById(`matchdiv-${player}-${i}`);
      if (data[player].matches[i].selected) {
        matchDiv.style.backgroundColor = "rgb(46,111,207, 0.1)";
      } else {
        matchDiv.style.backgroundColor = "white";
      }
    }
    $selected = Array.from(
      new Set([...$selected, ...data[player].matches])
    ).filter((x) => x.selected !== false);
  }
  function handleMatchClick(e, player, match) {
    data[player].matches[match].selected =
      !data[player].matches[match].selected;
    $selected = Array.from(
      new Set([...$selected, data[player].matches[match]])
    ).filter((x) => x.selected !== false);
    let matchDiv = document.getElementById(`matchdiv-${player}-${match}`);
    if (data[player].matches[match].selected) {
      matchDiv.style.backgroundColor = "rgb(46,111,207, 0.1)";
    } else {
      matchDiv.style.backgroundColor = "white";
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />
<div id="vp">
  <div id="first-col" />
  <div id="second-col">
    <div id="table">
      <div class="flex flex-row">
        <div style="min-width: 300px;" class="mt-1">
          {#if showSearch}
            <div class="py-1">
              <Svelecte
                {options}
                renderer="player-block"
                placeholder="Select Player"
                bind:value
                valueAsObject={true}
                on:change={onChange}
              />
            </div>
          {:else}
            <Button
              color="gray"
              classes="text-md my-1 w-full"
              handleClick={() => {
                showSearch = !showSearch;
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 m-2 fill-current"
                viewBox="0 0 48 48"
                ><path
                  d="M26 14h-4v8h-8v4h8v8h4v-8h8v-4h-8v-8zM24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z"
                /></svg
              >
              <span class="flex-grow">Add Player</span>
            </Button>
          {/if}
        </div>
        <div class="flex-grow" />
      </div>
      {#each $players as player}
        <div class="row">
          <div class="player-col">
            <div class="player" on:click={handlePlayerClick(player)}>
              <div class="flex flex-row flex-grow items-center">
                <div class="player-avatar">
                  <div
                    class="avatar-img"
                    style="background-color: {α(
                      data[player].color,
                      0.5
                    )}; border-color: {data[player].color}"
                  >
                    <img
                      class="rounded-full"
                      src={data[player].image}
                      alt="{data[player].firstName}'s Profile"
                    />
                  </div>
                </div>
                <div class="player-detail">
                  <p class="text-xl">
                    {data[player].firstName}
                    {data[player].lastName}
                  </p>
                  <span class="text-gray-700"
                    >Singles Rank #{data[player].singlesRank}</span
                  >
                </div>
              </div>
              <div class="items-stretch">
                {#if $players.length > 1}
                  <Button
                    color="white"
                    classes="font-bold w-6 h-6 rounded-full border-none focus:ring-red-200 bg-red-300 mt-1 mr-1"
                    handleClick={() => removePlayer(player)}
                    ><div class="ml-1.5 text-white">✕</div></Button
                  >
                {/if}
              </div>
            </div>
          </div>
          <div class="metric-col rounded-md">
            <div class="p-1.5" />
            {#each matches as match}
              <div
                id="matchdiv-{player}-{match}"
                class="item flex-col focus:outline-none"
                tabindex="0"
                on:click={(e) => handleMatchClick(e, player, match)}
              >
                <div class="flex flex-row mt-2 mb-2 px-2 w-full">
                  <div class="flex-grow text-xs text-gray-600">
                    {data[player].matches[match].tournamentInfo.month}
                    {data[player].matches[match].tournamentInfo.year}
                  </div>
                  {#if data[player].matches[match].stats.overall.result === "loss"}
                    <div class="flex-shrink font-bold text-xs text-red-500">
                      L
                    </div>
                  {:else}
                    <div class="flex-shrink font-bold text-xs text-green-500">
                      W
                    </div>
                  {/if}
                </div>
                <MatchRadar small {player} {match} />
                <div
                  class="flex flex-row mt-4 text-xs text-gray-600 mt-2 mb-2 px-2 w-full"
                >
                  <div class="flex-grow">
                    {data[player].matches[match].tournamentInfo.tournament}
                  </div>
                  <div class="flex-shrink">
                    {data[player].matches[match].tournamentInfo.round}
                  </div>
                </div>
              </div>
            {/each}
            <div class="p-2" />
          </div>
        </div>
      {/each}
    </div>
  </div>
  <div id="third-col" style="background-color: {bgColor};">
    {#if $selected.length > 0}
      <div id="side-graph"><Radar list={$selected} /></div>
      {#each Object.entries(groupedList) as entry}
        <AccordionItem {entry} />
      {/each}
    {:else}
      <div class="h-full grid items-center text-center align-center">
        <div style="filter: brightness(165%) contrast(122%);">
          <img
            class="w-full object-fit px-16 rounded-2xl"
            src="./tennis.gif"
            alt=""
          />
          <span class="text-xl text-gray-900 font-medium"
            >Please select a match to analyze.</span
          >
        </div>
      </div>
    {/if}
    <div />
  </div>
</div>

<style lang="postcss">
  :root {
    --gutter: 20px;
  }
  #table {
    @apply p-0 mt-3 ml-3;
  }
  .row {
    @apply flex flex-row;
  }
  .player-col {
    @apply flex flex-grow items-center flex-row;
    min-width: 300px;
  }
  .metric-col {
    @apply flex flex-row overflow-x-scroll;
  }
  .player {
    @apply p-1 rounded-md shadow-md border-2 border-gray-200 bg-white;
    display: flex;
    min-height: 150px;
    min-width: 100%;
  }
  #side-graph {
    display: flex;
    align-items: center;
    height: 50%;
    width: 100%;
    padding: 5px;
    margin: 5px;
    margin-top: 0px;
    margin-bottom: 0px;
    background-color: white;
  }
  .item {
    @apply flex items-center p-0 mx-1 rounded-md shadow-md border-2 border-gray-200 bg-white cursor-pointer;
    min-width: 150px;
    min-height: 150px;
    margin: 10px;
  }
  .item:hover {
    @apply border-2;
    border-color: rgb(46, 111, 207, 0.5);
  }
  .item:focus,
  .item:active {
    @apply border-2;
    border-color: rgb(46, 111, 207);
  }
  #vp {
    @apply w-full h-screen flex flex-row pt-16 overflow-hidden;
  }
  #first-col {
    width: 0%;
  }
  #second-col {
    background-color: white;
    min-width: 70%;
    overflow-y: scroll;
    position: relative;
    z-index: 1;
  }
  #third-col {
    @apply p-2 overflow-y-scroll;
    width: 40%;
    box-shadow: inset 2px -2px 10px 0px lightgray;
    background-color: white;
    z-index: 0;
  }
  .player-avatar {
    @apply pl-2 flex-none w-24 m-1;
  }
  .avatar-img {
    @apply w-24 h-24 rounded-full border-2;
  }
  .player-detail {
    @apply flex-grow items-stretch pl-4 align-middle;
  }
</style>

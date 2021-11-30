<script>
    import tennisData from "$lib/playerData";
    import MatchRadar from "$lib/components/MatchRadar/index.svelte";
</script>
<style lang="postcss">
:root {
  --gutter: 20px;
}
#table {
    @apply p-0 m-3;
}
.row {
    @apply flex flex-row;

}
.player-col {
    @apply flex flex-grow items-center flex-row;
    margin-right: 10px;
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
    align-items: center;
}
#side-graph {
    display: flex;
    align-items: center;
    height: 50%;
    padding: 5px;
    margin: 5px;
    margin-top: 0px;
    margin-bottom: 0px;
    background-color: white;
}
.item {
    @apply transition-all flex items-center p-0 mx-1 rounded-md shadow-md border-2 border-gray-200 bg-white;
    min-width: 150px;
    min-height: 150px;
    margin: 10px;
}
.item:hover {
    @apply border-2 border-yellow-400 bg-yellow-50;
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
}
#third-col {
    @apply min-w-1-4 p-2;
    box-shadow: inset 2px -2px 10px 0px lightgray;
    background-color: white;
}
.player-avatar {
    @apply pl-2 flex-none w-24 m-1;
}
.avatar-img {
    @apply w-24 h-24 rounded-full bg-gray-200;
}
.player-detail {
   @apply flex-grow items-stretch pl-4;
   vertical-align: middle;
}
</style>
<div id="vp">
    <div id="first-col"></div>
    <div id="second-col">
        <div id="table">
            {#each {length: 2} as _, player}
            <div class="row">
                <div class="player-col">
                    <div class="player">
                        <div class="flex flex-row flex-grow">
                            <div class="player-avatar">
                                <div class="avatar-img">
                                    <img class="rounded-full" src="{tennisData[player].image}" alt="{tennisData[player].firstName}'s Profile"/>
                                </div>
                            </div>
                            <div class="player-detail">
                                <p class="text-xl">{tennisData[player].firstName} {tennisData[player].lastName}</p>
                                <span class="text-gray-700">{new Date(tennisData[player].dob.year, tennisData[player].dob.month, tennisData[player].dob.day).toDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="metric-col">
                    {#each {length: 10} as _, match}
                    <div class="item"><MatchRadar small {player} {match}/></div>
                    {/each}
                </div>
            </div> 
            {/each}
        </div>
    </div>
    <div id="third-col">
        <div id="side-graph"><MatchRadar player={0} match={0}/></div>
    </div>
</div>

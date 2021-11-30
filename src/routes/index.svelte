<script>
    import RadarGraph from "$lib/components/RadarGraph/index.svelte"
</script>
<style lang="postcss">
:root {
  --gutter: 20px;
}
#table {
    @apply p-1;
}
.row {
    @apply flex flex-row p-1 pr-0;
}
.player-col {
    @apply min-w-1-4;
}
.metric-col {
    @apply flex flex-row overflow-x-scroll;
}
.player {
    @apply p-1 mx-1 rounded-md shadow-sm border-2 border-gray-200 bg-white;
    min-height: 150px;
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
    @apply transition-all flex items-center p-1 mx-1 rounded-md shadow-sm border-2 border-gray-200 bg-white;
    min-width: 150px;
    min-height: 150px;
}
.item:hover {
    @apply border-2 border-pink-500 bg-pink-50;
}
#vp {
    @apply w-full h-screen flex flex-row pt-16 overflow-hidden;
}
#first-col {
    width: 0%;
}
#second-col {
    min-width: 70%;
    overflow-y: scroll;
}
#third-col {
    @apply min-w-1-4 bg-white shadow-md;
}
</style>
<div id="vp">
    <div id="first-col"></div>
    <div id="second-col">
        <div id="table">
            <div class="row">
                <div class="player-col">
                    <div class="player"></div>
                </div>
                <div class="metric-col">
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                </div>
            </div> 
            <div class="row">
                <div class="player-col">
                    <div class="player"></div>
                </div>
                <div class="metric-col">
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                </div>
            </div>
            <div class="row">
                <div class="player-col">
                    <div class="player"></div>
                </div>
                <div class="metric-col">
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                </div>
            </div>
            <div class="row">
                <div class="player-col">
                    <div class="player"></div>
                </div>
                <div class="metric-col">
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                </div>
            </div>
            <div class="row">
                <div class="player-col">
                    <div class="player"></div>
                </div>
                <div class="metric-col">
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                </div>
            </div>
            <div class="row">
                <div class="player-col">
                    <div class="player"></div>
                </div>
                <div class="metric-col">
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                </div>
            </div>
            <div class="row">
                <div class="player-col">
                    <div class="player"></div>
                </div>
                <div class="metric-col">
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                </div>
            </div>
            <div class="row">
                <div class="player-col">
                    <div class="player"></div>
                </div>
                <div class="metric-col">
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                    <div class="item"><RadarGraph small/></div>
                </div>
            </div>
        </div>
    </div>
    <div id="third-col">
        <div id="side-graph"><RadarGraph/></div>
    </div>
</div>

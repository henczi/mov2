<script>
  import { onMount, onDestroy } from "svelte";
  import { selected } from "./selected-store.js"
  import { searchOptions } from "./search-options.js"
  import { createShelf } from "./shelf/shelf-store.js";
  import SearchBar from "./search/SearchBar.svelte";
  import HomeShelf from "./shelf/HomeShelf.svelte";
  import DetailCard from "./detail/DetailCard.svelte";

  let shelfs = {
    mock: createShelf("/api/mock/search"),
    inda: createShelf("/api/inda/search"),
    videa: createShelf("/api/videa/search"),
  };

  function search(params) {
    Object.keys(shelfs).forEach(x => shelfs[x].search(params))
  }

  onMount(() => search({ term: '' }));
  onDestroy(() => console.log("onDestroy"));
</script>

<style>
.page-container {
  width: 100vw;
  height: 100vh;
}
</style>

<div class="page-container flex flex-col bg-gray-800 pt-5 pl-5">
  <div class="flex-shirnk-0 pr-5">
    <SearchBar {searchOptions} on:search={s => search(s.detail)} />
  </div>

  <div class="shelf-list overflow-y-auto">
    <HomeShelf shelf={shelfs.mock} headerText="Home Server" />
    <HomeShelf shelf={shelfs.inda} headerImage="inda.png" />
    <HomeShelf shelf={shelfs.videa} headerImage="videa.png" />
  </div>

  {#if $selected}
    <DetailCard item={$selected}></DetailCard>
  {/if}
</div>

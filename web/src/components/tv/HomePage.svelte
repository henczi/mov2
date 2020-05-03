<script>
  import { onMount, onDestroy } from "svelte";
  import { selected } from "./selected-store.js"
  import { searchOptions } from "./search-options.js"
  import { shelfs, search, initShelfs } from "./shelfs.js";
  import SearchBar from "./search/SearchBar.svelte";
  import HomeShelf from "./shelf/HomeShelf.svelte";
  import DetailCard from "./detail/DetailCard.svelte";

  onMount(() => initShelfs());
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

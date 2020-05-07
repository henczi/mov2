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
  padding: 0 0 1rem 1rem;
}

.search-segment {
  padding-right: 1rem;
}
.shelf-list {
  overflow-y: auto;
}
</style>

<div class="page-container fley bg-dark">
  <div class="flex-no-shirnk search-segment">
    <SearchBar {searchOptions} on:search={s => search(s.detail)} />
  </div>

  <div class="shelf-list">
    <HomeShelf shelf={shelfs.mock} headerText="Home Server" />
    <HomeShelf shelf={shelfs.inda} headerImage="inda.png" />
    <HomeShelf shelf={shelfs.videa} headerImage="videa.png" />
  </div>

  {#if $selected}
    <DetailCard item={$selected}></DetailCard>
  {/if}
</div>

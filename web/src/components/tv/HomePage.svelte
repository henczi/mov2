<script>
  import { onMount, onDestroy } from "svelte";
  import { selected } from "./selected-store.js"
  import { searchOptions } from "./search-options.js"
  import { shelfs, search, initShelfs } from "./shelfs.js";
  import SearchBar from "./search/SearchBar.svelte";
  import Shelf from "./shelf/Shelf.svelte";
  import DetailCard from "./detail/DetailCard.svelte";

  onMount(() => initShelfs());
  onDestroy(() => console.log("onDestroy"));
</script>

<style>
.search-segment {
  padding-right: 1rem;
}
.shelf-list {
  overflow-y: auto;
}
</style>

<div class="flex-no-shirnk search-segment">
  <SearchBar {searchOptions} on:search={s => search(s.detail)} />
</div>

<div class="shelf-list">
  <Shelf shelf={shelfs.mock} headerText="Home Server" />
  <Shelf shelf={shelfs.inda} headerImage="inda.png" />
  <Shelf shelf={shelfs.videa} headerImage="videa.png" />
</div>

{#if $selected}
  <DetailCard item={$selected}></DetailCard>
{/if}

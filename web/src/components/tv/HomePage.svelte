<script>
  import { onMount, onDestroy } from "svelte";
  import { searchOptions } from "./search-options.js"
  import { shelfs, search, initShelfs } from "./shelfs.js";
  import SearchBar from "./search/SearchBar.svelte";
  import VideoShelf from "./shelf/VideoShelf.svelte";

  onMount(() => initShelfs());
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
  <!-- <VideoShelf manager={shelfs.mock} headerText="Home Server" /> -->
  <VideoShelf manager={shelfs.inda} headerImage="inda.png" />
  <VideoShelf manager={shelfs.videa} headerImage="videa.png" />
</div>

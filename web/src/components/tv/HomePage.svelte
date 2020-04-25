<script>
  import { onMount, onDestroy } from "svelte";
  import SearchBar from "./SearchBar.svelte";
  import HomeShelf from "./HomeShelf.svelte";

  let term = '';

  onMount(() => console.log("onMount"));
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
    <SearchBar on:search={s => term = s.detail.term} />
  </div>

  <div class="shelf-list overflow-y-auto">
    <HomeShelf term={term || ''} searchBase="/api/mock/search" headerText="Mock" />
    <HomeShelf term={term || ''} searchBase="/api/inda/search" headerImage="inda.png" />
    <HomeShelf term={term || 'alma'} searchBase="/api/videa/search" headerImage="videa.png" />
  </div>
</div>

<script>
  import { goto } from '$app/navigation';
  import WindowTitle from '$lib/elements/WindowTitle.svelte';
  import SearchBar from '$lib/tv/search/SearchBar.svelte';
  import Grid from '$lib/tv/grid/Grid.svelte';
  import { searchOptions } from './_search-options.js';
  import { manager, search, init } from './_search-manager.js';

  function select(item) {
    goto('/watch?v=' + item.href)
  }
</script>

<style>
  .page {
    z-index: 1;
    height: 100%;
    margin-top: 5rem;
    padding: 1rem 1rem 0 1rem;
    overflow-y: auto;
  }
  .search-segment {
    z-index: 2;
    padding-right: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>

<WindowTitle title="IndaVideo" />

<div class="search-segment">
  <SearchBar
    {searchOptions}
    on:init={s => init(s.detail)}
    on:search={s => search(s.detail)}
    imageSrc="/inda.png" />
</div>

<div class="page">
  <Grid  posterWidth={25} posterAspectRatio={16/9} {manager} on:select={event => select(event.detail)} />
</div>
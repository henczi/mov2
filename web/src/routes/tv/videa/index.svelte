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
  height: 100%;
  padding: 1rem 1rem 0 1rem;
}
.search-segment {
  padding-right: 1rem;
}
.content-container{
  margin-top: 2rem;
  overflow-y: auto;
}
</style>

<WindowTitle title="Videa"/>

<div class="page fley">
  <div class="flex-no-shirnk search-segment">
    <SearchBar {searchOptions} on:init={s => init(s.detail)} on:search={s => search(s.detail)} imageSrc="/videa.png" />
  </div>

  <div class="content-container flex-grow">
    <Grid posterWidth={28} posterAspectRatio={16/9} {manager} on:select={event => select(event.detail)}></Grid>
  </div>
</div>
<script>
  import { onMount } from 'svelte';
  import SearchBar from '../../../components/tv/search/SearchBar.svelte';
  import Grid from '../../../components/tv/grid/Grid.svelte';
  import { searchOptions } from './_search-options.js';
  import { manager, init } from './_search-manager.js';

  function search(params) {

  }

  onMount(() => init());
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
  overflow-y: auto
}
</style>

<div class="page fley">
  <div class="flex-no-shirnk search-segment">
    <SearchBar {searchOptions} on:search={s => search(s.detail)} />
  </div>

  <div class="content-container">
    <Grid {manager}></Grid>
  </div>
</div>
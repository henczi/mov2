<script>
  import { onMount } from "svelte";
  import LinkSelector from "../../../components/tv/LinkSelector.svelte";
  import WindowTitle from "../../../components/elements/WindowTitle.svelte";
  import SearchBar from "../../../components/tv/search/SearchBar.svelte";
  import Grid from "../../../components/tv/grid/Grid.svelte";
  import { searchOptions } from "./_search-options.js";
  import { manager, search, init } from "./_search-manager.js";
  import { createLinkManager } from "../../../components/tv/link-manager.js";

  const linkManager = createLinkManager("/api/mozicsillag/get-links?l=", "/api/mozicsillag/get-link?l=")
  let selected;

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
  .content-container {
    margin-top: 2rem;
    overflow-y: auto;
  }
</style>

<WindowTitle title="Mozicsillag" />

<div class="page fley">
  <div class="flex-no-shirnk search-segment">
    <SearchBar
      {searchOptions}
      on:search={s => search(s.detail)}
      text="Mozi&nbsp;&#9733;&nbsp;Csillag" />
  </div>

  <div class="content-container flex-grow">
    <Grid {manager} on:select={event => (selected = event.detail)} />
  </div>
</div>

{#if selected}
  <LinkSelector {linkManager} item={selected} on:close={() => (selected = undefined)} />
{/if}

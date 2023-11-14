<script>
  import LinkSelector from "$lib/tv/LinkSelector.svelte";
  import WindowTitle from "$lib/elements/WindowTitle.svelte";
  import SearchBar from "$lib/tv/search/SearchBar.svelte";
  import Grid from "$lib/tv/grid/Grid.svelte";
  import { searchOptions } from "./_search-options.js";
  import { manager, search, init } from "./_search-manager.js";
  import { createLinkManager } from "$lib/tv/link-manager.js";
  import { createMcsAutoResolver } from "$lib/tv/mcs-auto-resolver.js";

  const linkManager = createLinkManager("/api/mozicsillag/get-links?l=", "/api/mozicsillag/get-link?l=", createMcsAutoResolver)
  let selected;
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

<WindowTitle title="Mozicsillag" />

<div class="search-segment">
  <SearchBar
    {searchOptions}
    on:init={s => init(s.detail)}
    on:search={s => search(s.detail)}
    text="moziCsillag" />
</div>

<div class="page">
  <Grid  posterWidth={16} posterAspectRatio={2/3} {manager} on:select={event => (selected = event.detail)} />
</div>

{#if selected}
  <LinkSelector {linkManager} item={selected} on:close={() => (selected = undefined)} />
{/if}

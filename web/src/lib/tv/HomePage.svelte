<script>
  import { searchOptions } from "./search-options.js"
  import { createLinkManager } from "./link-manager.js"
  import { shelves, search, initShelves } from "./shelves.js";
  import SearchBar from "./search/SearchBar.svelte";
  import VideoShelf from "./shelf/VideoShelf.svelte";
  import { createMcsAutoResolver } from "./mcs-auto-resolver.js";

  const mozicsillagLinkManager = createLinkManager("/api/mozicsillag/get-links?l=", "/api/mozicsillag/get-link?l=", createMcsAutoResolver)
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
  <SearchBar {searchOptions} on:init={s => initShelves(s.detail)} on:search={s => search(s.detail)} />
</div>

<div class="shelf-list">
  <!-- <VideoShelf manager={shelves.mock} headerText="Home Server" /> -->
  <VideoShelf posterWidth={18} posterAspectRatio={2/3} manager={shelves.mozicsilag} linkManager={mozicsillagLinkManager} headerText="moziCsillag" link="/tv/mozicsillag"/>
  <VideoShelf posterWidth={28} posterAspectRatio={16/9} manager={shelves.inda} headerImage="/inda.png" link="/tv/inda" />
  <VideoShelf posterWidth={28} posterAspectRatio={16/9} manager={shelves.videa} headerImage="/videa.png" link="/tv/videa" />
</div>

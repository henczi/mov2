<script>
  import { focusable } from "../../../helpers/focusable";
  import { slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { createEventDispatcher } from "svelte";
  import CircleButton from "../../elements/CircleButton.svelte";
  import Select from "./options/Select.svelte";

  let mapTypeToComponent = {
    select: Select
  };

  /** @type {{ key: string, name: string, type: string, props: {} }[]}*/
  export let searchOptions = [];

  const dispatch = createEventDispatcher();

  let term = "";
  let options = {};

  function doSearch() {
    dispatch("search", { ...options, term });
  }

  function keydown(event) {
    if (event.keyCode == 13) doSearch();
  }

  let optionsOpen = false;
</script>

<style>
  .search-bar {
    padding: 1rem 0;
  }

  .search-container {
    margin-bottom: 1rem;
  }

  .search-container .search {
    border-bottom: 2px solid;
  }
  .search-container .search input {
    font-size: 3rem;
    font-weight: bold;
    background-color: transparent;
    color: var(--color-lighter);
  }

  .search-container .search input::placeholder {
    color: var(--color-mid-grey);
  }

  .search-container .search button {
    background-color: transparent;
    font-size: 2rem;
    padding: 0.75rem;
    margin-left: 1rem;
  }
  .search-container .search button:hover,
  .search-container .search button:focus {
    color: var(--color-lighter);
  }

  .options {
    margin: 1rem 0;
  }
</style>

<div class="search-bar text-lighter">
  <div class="search-container flex justify-between">
    <div class="search flex">
      <input
        use:focusable
        bind:value={term}
        type="text"
        placeholder="Search"
        on:keydown={keydown} />

      <button use:focusable class="text-mid-grey" on:click={doSearch}>
        <i class="fas fa-search" />
      </button>
    </div>
    <CircleButton on:click={() => (optionsOpen = !optionsOpen)}>
      <i class="fas fa-cogs" />
    </CircleButton>
  </div>

  {#if optionsOpen}
    <div class="options" transition:slide>
      <div class="flex flex-wrap justify-between">
        {#each searchOptions as so}
          <svelte:component
            this={mapTypeToComponent[so.type]}
            bind:value={options[so.key]}
            name={so.name}
            {...so.props} />
        {/each}
      </div>
    </div>
  {/if}
</div>

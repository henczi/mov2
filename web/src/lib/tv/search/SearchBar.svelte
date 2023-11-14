<script>
  import { onMount } from "svelte";
  import { focusable } from "$lib/helpers/focusable";
  import { fly, slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import CircleButton from "../../elements/CircleButton.svelte";
  import Select from "./options/Select.svelte";
  import NumberInput from "./options/NumberInput.svelte";

  import { serialize, deserialize } from "$lib/helpers/hash-serialize";

  let mapTypeToComponent = {
    select: Select,
    number: NumberInput,
  };

  /** @type {{ key: string, name: string, type: string, props: {} }[]}*/
  export let searchOptions = [];
  export let imageSrc = '';
  export let text = '';

  const dispatch = createEventDispatcher();

  let term = "";
  let options = {};

  function doSearch() {
    location.hash = serialize({ term, ...options })
    dispatch("search", { term, options });
  }

  function keydown(event) {
    if (event.keyCode == 13) doSearch();
  }

  onMount(() => {
    const h = location.hash.substring(1);
    const obj = deserialize(h);

    term = obj.term;

    for (const opt of searchOptions) {
      if (obj[opt.key]) {
        options[opt.key] = opt.type === 'number' ? (+obj[opt.key]) : obj[opt.key];
      }
    }
    dispatch("init", { term, options });
  })

  let optionsOpen = false;
</script>

<style>
  .search-bar {
    padding: 1rem 0;
  }

  .search-container .search input {
    font-size: 1.2rem;
    width: 100%;
    background-color: transparent;
    color: var(--color-lighter);
  }

  .search-container .search input::placeholder {
    color: var(--color-mid-grey);
  }

  .search-container .search button {
    background-color: transparent;
    font-size: 1.5rem;
    padding: 0.5rem;
    margin-left: 1rem;
    cursor: pointer;
  }
  .search-container .search button:hover,
  .search-container .search button:focus {
    color: var(--color-lighter);
  }

  .options {
    margin: .5rem 0;
    padding: .75rem 2rem;
    overflow: hidden;
  }

  .search-option-container {
    margin-bottom: 0.5rem;
  }

  .search-brand-container {
    margin: 0 2rem;
  }
  .search-text-container  {
    padding: .25rem 1.25rem;
    border-radius: 12px;
  }
  .search-brand-image {
    height: 32px;
  }
  .search-brand-text {
    font-size: 1.75rem;
    font-weight: bold;
  }

  @media(max-width: 400px) {
    .search-brand-container {
      display: none;
    }
    .search-container .search input {
      font-size: 1.5rem;
    }
    .search-container .search button {
      font-size: 1.5rem;
    }
  }
</style>

<div class="search-bar text-lighter">
  <div class="search-container flex justify-between">
    <div class="search flex">
      {#if imageSrc || text}
        <div class="search-brand-container flex">
          {#if imageSrc}
            <img class="search-brand search-brand-image self-center" src={imageSrc} alt="search" />
          {:else if text}
            <div class="search-brand search-brand-text self-center">{text}</div>
          {/if}
        </div>
      {/if}
      <div class="search-text-container bg-darker flex">
        <input
          use:focusable
          bind:value={term}
          type="text"
          placeholder="Search"
          on:keydown={keydown} />

        <button use:focusable={doSearch} class="search-btn text-mid-grey">
          <i class="fas fa-search" />
        </button>
      </div>

    </div>
    <CircleButton on:click={() => (optionsOpen = !optionsOpen)}>
      <i class="fas fa-cogs" />
    </CircleButton>
  </div>

  {#if optionsOpen}
    <div class="options bg-dark" transition:fly={{ y: -10, duration: 200 }}>
      <div class="flex flex-wrap justify-between">
        {#each searchOptions as so}
          <div class="search-option-container">
            <svelte:component
              this={mapTypeToComponent[so.type]}
              bind:value={options[so.key]}
              name={so.name}
              {...so.props} />
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

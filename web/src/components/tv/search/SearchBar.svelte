<script>
  import { focusable } from '../../../helpers/focusable';
  import { slide } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { createEventDispatcher } from 'svelte';
  import CircleButton from "../../elements/CircleButton.svelte";

  const dispatch = createEventDispatcher();

  let term = '';
  
  function doSearch() {
		dispatch('search', { term });
  }

  function keydown(event) {
    if (event.keyCode == 13) doSearch();
  }
  
  let optionsOpen = false;
</script>

<div class="search-bar text-gray-100 py-4">
  <div class="flex justify-between mb-4">
    <div class="search flex border-b-2 ">
      <input use:focusable bind:value={term} class="text-5xl font-bold bg-transparent outline-none" type="text" placeholder="Search" on:keydown={keydown} />

      <button use:focusable class="flex-grow-0 text-3xl p-3 ml-5 outline-none text-gray-600 hover:text-gray-100 focus:text-gray-100" on:click={doSearch}>
        <i class="fas fa-search" />
      </button>
    </div>
    <CircleButton on:click={() => optionsOpen = !optionsOpen}><i class="fas fa-cogs" /></CircleButton>
  </div>

  {#if optionsOpen}
    <div class="options my-4" transition:slide>
      WIP
    </div>
  {/if}
</div>

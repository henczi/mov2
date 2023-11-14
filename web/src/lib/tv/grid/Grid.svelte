
<script>
  import Card from '../card/VideoCard.svelte';
  import CircleButton from '../../elements/CircleButton.svelte';
  import { createEventDispatcher } from "svelte";
    import { fly } from 'svelte/transition';
  export let manager;
  export let posterWidth = 25;
  export let posterAspectRatio = 16/9;
  const dispatch = createEventDispatcher();
</script>

<style>
  .grid-container {
    display: grid;
  }

  .current-page {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.5rem 2rem;
  }

  .loading {
    padding: 3rem;
  }
  .paginator {
    margin-bottom: 2rem;
  }
</style>

{#if $manager && $manager.loading}
  <div class="loading flex justify-center text-light fa-5x">
    <i class="fas fa-life-ring spinner" />
  </div>
{:else if $manager && $manager.list}
  <div class="page-result" in:fly={{ y: 50, duration: 200 }}>
    <div class="grid-container" style="grid-template-columns: repeat(auto-fill, minmax({posterWidth}rem, 1fr))">
      {#each $manager.list as item}
        <div class="grid-item-container">
          <Card {posterAspectRatio} {item} on:select={() => dispatch('select', item)} />
        </div>
      {/each}
    </div>

    <div class="paginator flex justify-center">
      <CircleButton disabled={!$manager.previousPage} on:click={() => manager.page($manager.previousPage)}>
        <i class="fas fa-chevron-left" />
      </CircleButton>
      <div class="current-page text-light self-center">
        {$manager.currentPage}
      </div>
      <CircleButton disabled={!$manager.nextPage} on:click={() => manager.page($manager.nextPage)}>
        <i class="fas fa-chevron-right" />
      </CircleButton>
    </div>
  </div>
{:else}
<div class="flex text-light justify-center" in:fly={{ y: 50, duration: 200 }}>
  No content
</div>
{/if}
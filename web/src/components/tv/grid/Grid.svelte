
<script>
  import Card from '../card/VideoCard.svelte';
  import CircleButton from '../../elements/CircleButton.svelte';
  import { createEventDispatcher } from "svelte";
  export let manager;
  const dispatch = createEventDispatcher();
</script>

<style>
  .grid-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .grid-item-container {
    min-width: 25rem;
    max-width: 50rem;
    flex-grow: 1;
    flex-basis: 1rem;
  }

  .current-page {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.5rem 2rem;
  }

  .paginator {
    margin-bottom: 2rem;
  }
</style>

{#if $manager && $manager.loading}
  <div class="flex justify-center text-light fa-5x">
    <i class="fas fa-circle-notch fa-spin" />
  </div>
{:else if $manager && $manager.list}
  <div class="page-result">
    <div class="grid-container">
      {#each $manager.list as item}
        <div class="grid-item-container">
          <Card {item} on:select={() => dispatch('select', item)} />
        </div>
      {/each}
      <div class="grid-item-container"></div>
      <div class="grid-item-container"></div>
      <div class="grid-item-container"></div>
      <div class="grid-item-container"></div>
      <div class="grid-item-container"></div>
      <div class="grid-item-container"></div>
    </div>

    <div class="paginator flex justify-center">
      <CircleButton disabled={!$manager.previousPage} on:click={() => manager.page($manager.nextPage)}>
        <i class="fas fa-2x fa-chevron-left" />
      </CircleButton>
      <div class="current-page text-light self-center">
        {$manager.currentPage}
      </div>
      <CircleButton disabled={!$manager.nextPage} on:click={() => manager.page($manager.nextPage)}>
        <i class="fas fa-2x fa-chevron-right" />
      </CircleButton>
    </div>
  </div>
{:else}
<div class="flex text-light justify-center">
  No content
</div>
{/if}
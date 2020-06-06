<script>
  import { goto } from '@sapper/app';
  import Card from "../card/VideoCard.svelte";
  import CircleButton from "../../elements/CircleButton.svelte";
  export let headerText = "";
  export let headerImage = "";

  export let manager;

  function select(item) {
    goto(`/watch?v=${item.href}`)
  }

  let element;
  function loadMore() {
    // TODO
    [].slice
      .call(
        element.querySelectorAll(".shelf-content .card-container .focusable")
      )
      .pop()
      .focus(); // HACK
    manager.page($manager.nextPage);
  }
</script>

<style>
  .shelf {
    margin: 1.25rem 0;
  }
  .shelf .shelf-header {
    font-weight: bold;
    font-size: 2.25rem;
  }

  .shelf .shelf-content {
    padding: 1rem 0;
    overflow-y: auto;
  }

  .card-container {
    margin-right: 1rem;
    width: 28rem;
  }
  .has-more-container {
    padding-right: 1rem;
  }

  .no-content {
    font-size: 2.25rem;
    font-weight: bold;
  }

  .loading {
    padding-right: 1.25rem;
  }
</style>

<div class="shelf" bind:this={element}>
  {#if headerText}
    <div class="shelf-header text-white">{headerText}</div>
  {:else}
    <img height="32" src={headerImage} alt="header title {headerImage}" />
  {/if}
  <div class="shelf-content flex">
    {#if $manager.list && $manager.list.length}
      {#each $manager.list as item}
        <div class="card-container flex-no-shrink">
          <Card {item} on:select={() => select(item)} />
        </div>
      {/each}
      {#if $manager.hasMore && !$manager.loading}
        <div class="has-more-container flex">
          <CircleButton big on:click={loadMore}>
            <i class="fas fa-3x fa-chevron-right" />
          </CircleButton>
        </div>
      {/if}
    {:else if !$manager.loading}
      <div class="no-content self-center text-mid-grey">No content :(</div>
    {/if}
    {#if $manager.loading}
      <div class="loading self-center text-light fa-5x">
        <i class="fas fa-circle-notch fa-spin" />
      </div>
    {/if}
  </div>
</div>

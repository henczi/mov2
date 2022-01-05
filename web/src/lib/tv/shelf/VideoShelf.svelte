<script>
  import { goto } from '$app/navigation';
  import Card from "../card/VideoCard.svelte";
  import CircleButton from "../../elements/CircleButton.svelte";
  import LinkSelector from '../LinkSelector.svelte';
  export let headerText = "";
  export let headerImage = "";
  export let link = ".";

  export let manager = undefined;
  export let linkManager = undefined;
  export let posterWidth = 25;
  export let posterAspectRatio = 16/9;

  let selected;

  function select(item) {
    linkManager
      ? selected = item
      : goto(`/watch?v=${item.href}`)
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

    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .card-container {
    margin-right: 1rem;

    scroll-snap-align: start;
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
    <a href={link}><div class="shelf-header text-white">{headerText}</div></a>
  {:else}
    <a href={link}><img height="32" src={headerImage} alt="header title {headerImage}" /></a>
  {/if}
  <div class="shelf-content flex">
    {#if $manager.list && $manager.list.length}
      {#each $manager.list as item}
        <div class="card-container flex-no-shrink" style="width: {posterWidth}rem;">
          <Card {item} {posterAspectRatio} on:select={() => select(item)} />
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

{#if linkManager}
  {#if selected}
    <LinkSelector {linkManager} item={selected} on:close={() => (selected = undefined)} />
  {/if}
{/if}
<script>
  import { onMount, tick } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { fade, scale } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { focusable } from "$lib/helpers/focusable";
  import { snOverlay } from "./_spatial-navigation";
  let dispatch = createEventDispatcher();

  export let linkManager;
  export let item;

  let itemDetail;

  let selectedEpisode;
  let selectedEpisodeLinks;

  $: links = itemDetail && itemDetail.links
    ? itemDetail.links.reverse()
    : selectedEpisodeLinks && selectedEpisodeLinks.reverse();

  let rootEl;

  async function focusFirstRow() {
    await tick();
    const el = rootEl.querySelector(".link-row.focusable");
    if (el) { el.focus() }
  }

  function selectEpisode(episode) {
    selectedEpisode = episode;
    selectedEpisodeLinks = episode.links
    focusFirstRow();
  }

  function back() {
    selectedEpisodeLinks = undefined;
    focusFirstRow();
  }

  async function selectLink(item, e = {}) {
    const newTab = e && (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button === 4);
    const link = await linkManager.getLink(item.href);
    if (link.redirect) (newTab ? open : goto)("/watch?v=" + link.redirect);
    else alert("Can not resolve this link :(");
  }

  onMount(async () => {
    itemDetail = await linkManager.getLinks(item.href);
    focusFirstRow();
  });

  onMount(snOverlay)
</script>

<style>
  .overlay {
    z-index: 99;
  }
  .container {
    display: flex;
    width: 80%;
    height: 80%;
  }
  .container .buttons {
    display: flex;
    flex-direction: column;
  }
  .container .buttons .button {
    padding: 0.5rem;
    font-weight: bold;
    text-align: center;
    border-right: 1px solid var(--color-white);
  }
  .container .buttons .button:last-child {
    flex-grow: 1;
  }
  .link-selector {
    padding: 2.5rem;
    overflow-y: scroll;
    flex-grow: 1;
  }
  .link,
  .episode {
    padding: 1rem 0.5rem;
    border-bottom: 1px solid var(--color-mid-grey);
  }
  .link > div {
    flex: 1 1 10rem;
  }
  .link:focus,
  .episode:focus,
  .button:focus {
    background-color: var(--color-white);
    color: var(--color-dark);
  }
</style>

<div
  class="overlay"
  bind:this={rootEl}
  transition:fade
  on:click={(e) => e.target === e.currentTarget && dispatch('close')}>
  {#if itemDetail}
    <div class="container bg-dark text-lighter">
      <div class="buttons">
        <div class="button" use:focusable={() => dispatch('close')}>
          <i class="fas fa-fw fa-times" />
        </div>
        {#if links && itemDetail && itemDetail.episodes}
          <div
            class="button"
            use:focusable={() => back()}>
            <i class="fas fa-fw fa-chevron-left" />
          </div>
        {/if}
      </div>
      <div class="link-selector" transition:scale>
        <div class="flex">
          {#if itemDetail.image}
            <div
              style="margin: 1rem; width: 200px; height: 300px;"
              class="flex-no-shrink">
              <img style="width: 100%;" src={itemDetail.image} alt="poster" />
            </div>
          {/if}
          <div>
            <h2>{itemDetail.title}</h2>
            <p>{itemDetail.description}</p>
          </div>
        </div>
        <hr />
        {#if itemDetail.episodes && !selectedEpisodeLinks}
          <h3>Episodes</h3>
          <div class="episodes">
            {#each itemDetail.episodes as episode}
              <div
                class="episode link-row"
                use:focusable={() => selectEpisode(episode)}>
                {episode.name}
              </div>
            {/each}
          </div>
        {/if}
        {#if links}
          {#if itemDetail.episodes}
            <h2>{selectedEpisode.name}</h2>
          {/if}
          <h3>Links</h3>
          <div class="links">
            {#each links as link}
              <div
                role="link"
                class="flex justify-between link link-row"
                use:focusable={e => selectLink(link, e)}>
                <div>{link.name}</div>
                <div>{link.lang}</div>
                <div>{link.uploadTime}</div>
                <div>{link.views}</div>
                <div>{link.uploader}</div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <div class="loading self-center text-light fa-5x">
      <i class="fas fa-circle-notch fa-spin" />
    </div>
  {/if}
</div>

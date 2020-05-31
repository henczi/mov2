<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { fade, scale } from "svelte/transition";
  import { goto } from "@sapper/app";
  import CircleButton from "../../../components/elements/CircleButton.svelte";
  import { focusable } from "../../../helpers/focusable";
  let dispatch = createEventDispatcher();

  export let item;

  let itemDetail;

  let selectedEpisode;
  let selectedEpisodeLinks;

  $: links = itemDetail && itemDetail.links || selectedEpisodeLinks;

  let rootEl;

  async function select(item) {
    const link = await fetch("/api/mozicsillag/get-link?l=" + item.href).then(x => x.json())
    if (link.redirect)
      goto("/watch?v=" + link.redirect);
    else
      alert('Can not resolve this link :(');
  }

  onMount(async () => {
    itemDetail = await fetch("/api/mozicsillag/get-links?l=" + item.href).then(
      x => x.json()
    );
    setTimeout(() => rootEl.querySelector(".focusable").focus());
  });
</script>

<style>
  .link-selector {
    padding: 2.5rem;
    overflow-y: scroll;
    width: 80%;
    height: 80%;
  }

  .button {
    padding: 0.5rem;
    font-weight: bold;
    text-align: center;
    border: 1px solid var(--color-white);
  }

  .links-back-button {
    margin: 1rem 0;
  }

  .link,
  .episode {
    padding: 1rem 0.5rem;
    border-bottom: 1px solid var(--color-mid-grey);
  }

  .link>div,
  .episode>div {
    flex: 1 1 10rem;
  }

  .link:focus,
  .episode:focus,
  .button:focus {
    background-color: var(--color-white);
    color: var(--color-dark);
  }
</style>

<div class="overlay" bind:this={rootEl} transition:fade>
  {#if itemDetail}
    <div class="link-selector bg-dark text-lighter" transition:scale>
      <div class="button" use:focusable={() => dispatch('close')}>Close</div>
      <div class="flex">
        {#if itemDetail.image}
          <div style="margin: 1rem; width: 200px; height: 300px;" class="flex-no-shrink">
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
              class="episode"
              use:focusable={() => (selectedEpisode = episode, selectedEpisodeLinks = episode.links)}>
              {episode.name}
            </div>
          {/each}
        </div>
      {/if}
      {#if links}
        {#if itemDetail.episodes}
          <div
            class="links-back-button button"
            use:focusable={() => (selectedEpisodeLinks = undefined)}>
            &lt;- Back
          </div>
          <h2>{selectedEpisode.name}</h2>
        {/if}
        <h3>Links</h3>
        <div class="links">
          {#each links as link}
            <div
              class="flex justify-between link"
              use:focusable={() => select(link)}>
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
  {:else}
    <div class="loading self-center text-light fa-5x">
      <i class="fas fa-circle-notch fa-spin" />
    </div>
  {/if}
</div>

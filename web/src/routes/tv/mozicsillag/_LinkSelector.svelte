<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { goto } from "@sapper/app";
  import CircleButton from "../../../components/elements/CircleButton.svelte";
  import { focusable } from "../../../helpers/focusable";
  let dispatch = createEventDispatcher();

  export let item;

  let itemDetail;

  let selectedEpisodeLinks;

  $: links = itemDetail && itemDetail.links || selectedEpisodeLinks;

  let rootEl;

  async function select(id) {
    goto("/player?src=" + id);
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

<div class="overlay" bind:this={rootEl}>
  {#if itemDetail}
    <div class="link-selector bg-dark text-lighter" translate:fade>
      <div class="button" use:focusable={() => dispatch('close')}>Close</div>
      <div class="flex">
        {#if itemDetail.image}
          <div style="padding: 1rem;">
            <img style="height: 250px;" src={itemDetail.image} alt="poster" />
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
              use:focusable={() => (selectedEpisodeLinks = episode.links)}>
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
        {/if}
        <h3>Links</h3>
        <div class="links">
          {#each links as link}
            <div
              class="flex justify-between link"
              use:focusable={() => select(link.id)}>
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

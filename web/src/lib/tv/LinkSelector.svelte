<script>
  import { onMount, tick } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { fade, fly, scale } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { focusable } from "$lib/helpers/focusable";
  import { snOverlay } from "./_spatial-navigation";
import { current_component } from "svelte/internal";
import Button from "$lib/elements/Button.svelte";
    import CircleButton from "$lib/elements/CircleButton.svelte";
  let dispatch = createEventDispatcher();

  export let linkManager;
  export let item;

  let itemDetail;

  let selectedEpisode;
  let selectedEpisodeLinks;

  $: links =
    itemDetail && itemDetail.links
      ? itemDetail.links.reverse()
      : selectedEpisodeLinks && selectedEpisodeLinks.reverse();

  let rootEl;

  let playBtnText = '';

  async function focusFirstRow() {
    await tick();
    const el = rootEl.querySelector(".link-row.focusable");
    if (el) {
      el.focus();
    }
  }

  async function focusPlay() {
    await tick();
    const el = rootEl.querySelector(".play-button .focusable");
    if (el) {
      el.focus();
    }
  }

  function selectEpisode(episode) {
    selectedEpisode = episode;
    selectedEpisodeLinks = episode.links;
    focusPlay();
  }

  function back() {
    selectedEpisodeLinks = undefined;
    focusFirstRow();
  }

  async function autoResolve(links) {
    const [redirect, videoInfo] = await linkManager.autoResolve(links, (c, a, s) => {
      console.log(`${c}/${a} (${s})`)
      playBtnText = `${c}/${a} (${s})`;
    })
    if (redirect) {
      goto("/watch?v=" + redirect)
    }
  }

  async function selectLink(item, e = {}) {
    const newTab =
      e && (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button === 4);
    const link = await linkManager.getLink(item.href);
    if (link.redirect) (newTab ? open : goto)("/watch?v=" + link.redirect);
    else alert("Can not resolve this link :(");
  }

  onMount(async () => {
    itemDetail = await linkManager.getLinks(item.href);
    if (itemDetail.episodes) {
      focusFirstRow();
    } else {
      focusPlay();
    }
  });

  onMount(snOverlay);
</script>

<div
  class="overlay"
  bind:this={rootEl}
  transition:fade
  on:click={(e) => e.target === e.currentTarget && dispatch("close")}
>
  {#if itemDetail}
    <div class="container">
      <div class="buttons text-lighter">
        <div class="button bg-darker flex justify-center items-center" style="width: 80px; height: 80px;" use:focusable={() => dispatch("close")} transition:scale={{ duration: 200 }}>
          <i class="fas fa-fw fa-2x fa-times" />
        </div>
        {#if links && itemDetail && itemDetail.episodes}
          <div class="button bg-darker flex justify-center items-center" style="width: 55px; height: 55px;" use:focusable={() => back()} transition:scale={{ duration: 200 }}>
            <i class="fas fa-fw fa-chevron-left" />
          </div>
        {/if}
      </div>
      <div class="link-selector bg-dark text-lighter flex" transition:fly={{ x: 300, duration: 250 }}>
        <div class="info fley">
          {#if itemDetail.image}
            <div
              class="poster flex-no-shrink flex"
              in:fly={{ y: 100, duration: 200, delay: 150 }}

            >
              <img style="width: 100%;" src={item.imdb?.poster || itemDetail.image} alt="poster" />
              {#if links}
                <div class="play-button">
                  <CircleButton on:click={() => autoResolve(links)}>
                    <i class="fas fa-fw fa-play" />
                  </CircleButton>
                </div>
              {/if}
            </div>
          {/if}
          <div>
            <h2 in:fly={{ y: 100, duration: 200, delay: 300 }}>{itemDetail.title}</h2>
            <p in:fly={{ y: 100, duration: 200, delay: 400 }}>{itemDetail.description}</p>
          </div>
        </div>
        <div class="flex-grow">
          <div><small>&nbsp;{playBtnText}&nbsp;<small></div>
          {#if itemDetail.episodes && !selectedEpisodeLinks}
            <h3>/ EPISODES</h3>
            <div class="episodes items-center">
              {#each itemDetail.episodes as episode, index}
                <div
                  class="episode bg-darker link-row justify-center items-center"
                  in:fly={{ y: 100, duration: 200, delay: index * 50 }}
                  use:focusable={() => selectEpisode(episode)}
                >
                  {episode.name}
                </div>
              {/each}
            </div>
          {/if}
          {#if links}
            {#if itemDetail.episodes}
              <h2>{selectedEpisode.name}</h2>
            {/if}
            <h3>/ LINKS</h3>
            <div class="links items-center">
              {#each links as link, index}
                <div
                  role="link"
                  class="flex justify-between link bg-darker link-row justify-center items-center"
                  in:fly={{ y: 100, duration: 200, delay: 200 + index * 20 }}
                  use:focusable={(e) => selectLink(link, e)}
                >
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
    </div>
  {:else}
    <div class="loading self-center text-light fa-5x">
      <i class="fas fa-life-ring spinner" />
    </div>
  {/if}
</div>

<style>
  .overlay {
    z-index: 99;
  }
  .container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .container .buttons {
    flex-shrink: 0;
    display: flex;
    padding: 2rem;
    align-items: center;
    gap: 1rem;
  }
  .container .buttons .button {
    padding: 0.5rem;
    font-weight: bold;
    text-align: center;
    border-radius: 50%;
    padding: 1rem
  }
  .container .buttons .button:last-child {
    flex-grow: 1;
  }
  .link-selector {
    padding: 2.5rem;
    overflow-y: scroll;
    flex-grow: 1;
    height: 100%;
    border-radius: 4.5rem 0 0 4.5rem;
  }
  .info {
    flex-shrink: 0;
    width: 260px;
    margin-right: 2rem;
  }
  .poster {
    width: 100%;
    max-height: 50%;
    overflow: hidden;
    border-radius: 12px;
    position: relative;
    box-shadow: 0 0 20px 0 black;
  }
  .play-button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .link,
  .episode {
    padding: 1rem 0.5rem;
    border-radius: 12px;
    margin-bottom: 0.75rem;
    padding: .75rem 1.5rem;

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

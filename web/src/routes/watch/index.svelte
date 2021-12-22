<script context="module">
  export async function load({ page }) {
    return { props: { v: page.query.get('v') } };
  }
</script>

<script>
  import { onMount } from "svelte";
  import WindowTitle from "$lib/elements/WindowTitle.svelte";
  import Plyr from "$lib/player/Plyr.svelte";
  export let v;
  let config;
  let error;
  let title = "Loading video";

  onMount(async () => {
    const videoInfoReq = await fetch(`/api/url-resolver/resolve?l=${v}`);
    const videoInfo = await videoInfoReq.json();

    if (!videoInfoReq.ok || videoInfo.error) {
      error = videoInfo?.error?.msg || 'Something went wrong';
      return;
    }

    title = videoInfo && videoInfo.title;
    config = videoInfo;
    if (!config) {
      error = "No available source";
    }
  });
</script>

<style>
  .full-size {
    background-color: black;
    width: 100vw;
    height: 100vh;
  }
  .full-size :global(.plyr){
    height:100%;
  }
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<WindowTitle {title} />

<div class="full-size">

  {#if config}
    <Plyr {config} />
  {:else}
    <div class="full-size flex-center">
      {#if error}
        <h1 class="text-light">{error}</h1>
      {:else}
        <div class="self-center flex justify-center text-light fa-5x">
          <i class="fas fa-circle-notch fa-spin" />
        </div>
      {/if}
    </div>
  {/if}

</div>

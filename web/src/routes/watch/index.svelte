<script context="module">
  export async function preload(page, session) {
    return { v: page.query.v };
  }
</script>

<script>
  import { onMount } from "svelte";
  import WindowTitle from "../../components/elements/WindowTitle.svelte";
  import Plyr from "../../components/player/Plyr.svelte";
  export let v;
  let config;
  let error;
  let title = "Loading video";

  onMount(async () => {
    const videoInfo = await fetch(`/api/url-resolver/resolve?l=${v}`).then(x =>
      x.json()
    );
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

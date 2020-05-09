<script context="module">
  export async function preload(page, session) {
    const p = page.query.v.includes('indavideo.hu') ? 'inda' : (page.query.v.includes('videa.hu') ? 'videa' : undefined);
    if (!['inda', 'videa'].includes(p)) {
      this.error(404, 'Wrong provider');
    }
    return { p, v: page.query.v };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import WindowTitle from '../../components/elements/WindowTitle.svelte';
  export let p;
  export let v;
  let video;
  let error;
  let title = 'Loading video';

  onMount(async () => {
    const videoInfo = await fetch(`/api/${p}/get_video_info?v=${v}`).then(x => x.json());
    title = videoInfo.title;
    video = videoInfo.sources.filter(x => x.resolution === '360p')[0] || videoInfo.sources[0]
    if (!video) {
      error = 'No available source';
    }
  })
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

<div class="full-size flex-center">
  {#if video}
    <video class="full-size" controls autoplay>
      <source src={video.src} />
    </video>
  {:else if error}
    <h1 class="text-light">
      {error}
    </h1>
  {:else}
    <div class="self-center flex justify-center text-light fa-5x">
      <i class="fas fa-circle-notch fa-spin" />
    </div>
  {/if}
</div>

<script>
  import Plyr from "plyr";
  import "plyr/dist/plyr.css";
  import { onMount } from "svelte";

  export let config;

  let videoEl;
  let player;

  function createPlyrVideo() {
    player = new Plyr(videoEl);
    if (config) {
      player.source = {
        title: config.title,
        type: 'video',
        sources: config.sources.map(x => ({
          src: x.src,
          type: x.mime,
          size: x.resolution && parseInt(x.resolution.slice(0, -1))
        }))
      };
    }
  }

  onMount(() => createPlyrVideo());
</script>

<video controls autoplay bind:this={videoEl}>
</video>

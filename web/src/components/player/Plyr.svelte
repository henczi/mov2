<script>
  import Plyr from "plyr";
  import Hls from "hls.js";
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
        type: "video",
        sources: config.sources.map(x => ({
          src: x.src,
          type: x.mime,
          size: x.resolution && parseInt(x.resolution.slice(0, -1))
        }))
      };
      player.on("ready", function(event) {
        var instance = event.detail.plyr;

        var hslSource = null;
        var sources = instance.media.querySelectorAll("source");
        for (let i = 0; i < sources.length; ++i) {
          if (sources[i].src.indexOf(".m3u8") > -1) {
            hslSource = sources[i].src;
          }
        }

        if (hslSource !== null && Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource(hslSource);
          hls.attachMedia(instance.media);
          hls.on(Hls.Events.MANIFEST_PARSED, function() {
            console.log("MANIFEST_PARSED");
          });
        }
      });
    }
  }

  onMount(() => createPlyrVideo());
</script>

<video controls autoplay bind:this={videoEl} />

<script context="module">
  export async function load({ page }) {
    return { props: { src: page.query.get('src') } };
  }
</script>

<script>
  export let src;
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

<div class="full-size flex-center">
  {#if src.includes('indavideo')}
    <iframe
      class="full-size"
      title="VideoFrame"
      src="/api/inda/redirect?l={src}"
      allowfullscreen
      frameborder="0" />
  {:else if src.includes('videa')}
    <iframe
      class="full-size"
      title="VideoFrame"
      src="//videa.hu/player?v={src.split('-').pop()}"
      allowfullscreen
      frameborder="0" />
  {:else}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video class="full-size" controls autoplay>
      <source {src} />
    </video>
  {/if}
</div>

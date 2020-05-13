<style>
.page-container {
  width: 100vw;
  height: 100vh;
}
</style>

<script>
  import { onMount } from 'svelte';
  import { snInit, snDestroy } from './_spatial-navigation.js';

  onMount(() => {
    snInit()
    return () => snDestroy()
  });
</script>

<div class="page-container fley bg-dark">
  <slot></slot>
</div>

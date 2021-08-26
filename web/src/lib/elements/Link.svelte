<script>
  export let href;
</script>

<a {href} on:click={e => e.preventDefault()}>
  <slot></slot>
</a>
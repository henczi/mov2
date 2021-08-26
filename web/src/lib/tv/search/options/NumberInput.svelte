<script>
  import { focusable } from "$lib/helpers/focusable";
  export let name;
  export let append;
  export let min;
  export let max;
  export let defaultValue;
  export let value;

  value = defaultValue;
</script>

<style>
  .title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-right: 1rem;
  }
  .append {
    font-size: 1.25rem;
    font-weight: bold;
    margin-left: 0.5rem;
  }
  input {
    padding: 0.5rem 1rem;
    margin-left: 0.5rem;
    border: 2px solid transparent;
  }

  input:hover,
  input:focus {
    background-color: var(--color-lighter);
    color: var(--color-darker);
  }
</style>

<div class="flex items-center">
  <div class="title">{name}</div>
  <input
    type="number"
    {min} {max}
    bind:value={value}
    on:focus={function(){ this.select() }}
    use:focusable
    class="bg-darker text-lighter"/>
  <div class="append">{append}</div>
</div>

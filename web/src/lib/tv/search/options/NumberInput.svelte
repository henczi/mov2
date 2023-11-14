<script>
  import { focusable } from "$lib/helpers/focusable";
  export let name;
  export let append;
  export let min;
  export let max;
  export let defaultValue;
  export let value;

  value = value == null ? defaultValue : value;
</script>

<style>
  fieldset {
    border-radius: 12px;
    border-width: 1px;
    border-color: rgba(255,255,255,.2);
    padding-right: .25rem;
    padding-bottom: .25rem;
    padding-left: .25rem;
  }
  .title {
    font-size: .85rem;
    font-weight: normal;
    margin-right: 1rem;
  }
  .append {
    font-size: 1.25rem;
    font-weight: bold;
    margin-left: 0.5rem;
  }
  input {
    padding: 0.5rem 1rem;
    margin: 0.25rem;
    border: 2px solid transparent;
    border-radius: 12px;
  }

  input:hover,
  input:focus {
    background-color: var(--color-lighter);
    color: var(--color-darker);
  }
</style>

<fieldset class="flex items-center">
  <legend class="title">{name}{append}</legend>
  <input
    type="number"
    {min} {max}
    bind:value={value}
    on:focus={function(){ this.select() }}
    use:focusable
    class="bg-darker text-lighter"/>
  <!-- <div class="append">{append}</div> -->
</fieldset>

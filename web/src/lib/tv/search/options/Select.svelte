<script>
  import { focusable } from "$lib/helpers/focusable";
  export let name;
  export let value;
  export let options;

  function select(idx) {
    value = options[idx].key;
  }

  function isSelected(o, value) {
    return o.key === value;
  }

  if (value === undefined) select(0);
</script>

<style>
  .title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-right: 1rem;
  }
  button {
    padding: 0.5rem 1rem;
    margin-left: 0.5rem;
    border: 2px solid transparent;
  }

  button:hover,
  button:focus {
    background-color: var(--color-lighter);
    color: var(--color-darker);
  }

  button.selected {
    border-color: var(--color-mid-grey);
  }

  .options {
    flex-wrap: wrap;
  }
  .option {
    margin: 0.25rem;
  }
</style>

<div class="flex items-center">
  <div class="title">{name}</div>
  <div class="options flex">
    {#each options as opt, index}
      <button
        use:focusable={() => select(index)}
        class="option bg-darker text-lighter"
        class:selected={isSelected(opt, value)}>
        {opt.label}
      </button>
    {/each}
  </div>
</div>

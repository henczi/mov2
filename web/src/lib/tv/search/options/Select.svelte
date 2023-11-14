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
  button {
    padding: 0.5rem 1rem;
    border: 2px solid transparent;
    border-radius: 12px;
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

<fieldset class="flex items-center">
  <legend class="title">{name}</legend>
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
</fieldset>

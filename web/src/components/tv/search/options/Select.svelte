<script>
  import { focusable } from "../../../../helpers/focusable";
  export let name;
  export let value;
  export let options;

  function select(idx) {
    value = options[idx].key;
  }

  function isSelected(o, value) {
    return o.key === value;
  }

  select(0);
</script>

<div class="flex items-center">
  <div class="text-xl font-bold mr-4">{name}</div>
  <div class="flex">
    {#each options as opt, index}
      <button
        use:focusable
        class="px-4 py-2 ml-2 text-md bg-gray-900 text-gray-100 border-2 border-transparent border-solid
        focus:bg-gray-100 focus:text-gray-900"
        class:border-gray-600={isSelected(opt, value)}
        on:click={() => select(index)}>
        {opt.label}
      </button>
    {/each}
  </div>
</div>

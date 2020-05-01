<script>
  import { focusable } from '../../helpers/focusable';
  export let s = 16;
</script>

<button
  use:focusable
  on:click
  class="self-center text-center flex-shrink-0 w-{s} h-{s} p-3 rounded-full
  bg-gray-900 text-gray-100 outline-none focus:bg-gray-100 focus:text-gray-900">
  <slot />
</button>

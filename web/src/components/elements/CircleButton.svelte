<script>
  import { focusable } from "../../helpers/focusable";
  export let big = false;
</script>

<style>
  .button {
    align-self: center;
    text-align: center;
    flex-shrink: 0;
    width: 4rem;
    height: 4rem;
    padding: 0.75rem;
    border-radius: 50%;
  }

  .button.big {
    width: 5rem;
    height: 5rem;
  }

  .button:hover,
  .button:focus {
    background-color: var(--color-lighter);
    color: var(--color-darker);
  }
</style>

<button use:focusable on:click class="button bg-darker text-lighter" class:big>
  <slot />
</button>

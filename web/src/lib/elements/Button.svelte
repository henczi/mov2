<script>
  import { focusable } from "$lib/helpers/focusable";
  import { createEventDispatcher } from "svelte";
  export let big = false;
  export let disabled = false;
  const dispatch = createEventDispatcher();
</script>

<style>
  .button {
    align-self: center;
    text-align: center;
    flex-shrink: 0;
    min-width: 4rem;
    height: 4rem;
    padding: 0.75rem;
  }

  .button:disabled {
    opacity: 0.3;
  }

  .button.big {
    min-width: 5rem;
    height: 5rem;
  }

  .button:hover:not(:disabled),
  .button:focus:not(:disabled) {
    background-color: var(--color-lighter);
    color: var(--color-darker);
  }

  @media(max-width: 400px) {
    .button {
      width: 3rem;
      height: 3rem;
    }
    .button.big {
      width: 4rem;
      height: 4rem;
    }
  }
</style>

<button use:focusable={() => dispatch('click')} class="button bg-darker text-lighter" class:big {disabled}>
  <slot />
</button>

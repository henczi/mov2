<script>
  import { focusable } from "../../helpers/focusable";
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
    width: 4rem;
    height: 4rem;
    padding: 0.75rem;
    border-radius: 50%;
  }

  .button:disabled {
    opacity: 0.3;
  }

  .button.big {
    width: 5rem;
    height: 5rem;
  }

  .button:hover:not(:disabled),
  .button:focus:not(:disabled) {
    background-color: var(--color-lighter);
    color: var(--color-darker);
  }
</style>

<button use:focusable={() => dispatch('click')} class="button bg-darker text-lighter" class:big {disabled}>
  <slot />
</button>

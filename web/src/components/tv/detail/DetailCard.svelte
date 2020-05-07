<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import { selected } from "../selected-store.js";
  import CircleButton from "../../elements/CircleButton.svelte";
  export let item;
  let placeholderImage =
    "https://via.placeholder.com/350x200/333333/ACACAC/?text=No+Image";

  import { send, receive } from "../item-transition.js";

  let rootEl;

  function select() {
    goto("/player?src=" + item.href);
  }

  onMount(() => {
    setTimeout(() => rootEl.querySelector(".focusable").focus());
  });
</script>

<style>
  .overlay {
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card {
    padding: 2.5rem;
    display: flex;
    overflow: hidden;
    max-width: 1200px;
  }

  .card-image {
    position: relative;
    flex-shrink: 0;
    width: 34rem;
    height: 20rem;
  }
  .card-image .image {
    width: 100%;
    height: 100%;
    background: black;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .card-image .duration-label {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 0.875rem;
    margin: 0 0.75rem 0.5rem 0;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }
  .details {
    display: flex;
    flex-direction: column;
    min-width: 30rem;
    margin-left: 5rem;
  }

  .details .title {
    font-weight: bold;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  .details .description {
    font-size: 1rem;
  }

  .details .controls {
    margin-top: auto;
    display: flex;
    justify-content: space-around;
    padding-top: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .details .upload {
    padding: 1rem 0 0 0;
    border-top: 1px solid var(--color-mid-grey);
  }
</style>

<div class="overlay" bind:this={rootEl}>
  <div
    class="card bg-dark text-lighter"
    in:receive|local={{ key: item.href }}
    out:send|local={{ key: item.href }}>
    <div class="card-image">
      <div
        class="image"
        style="background-image: url({item.image || placeholderImage})" />
      <div class="duration-label text-lighter bg-darker">{item.duration}</div>
    </div>

    <div class="details">
      <div class="title">{item.title}</div>
      <p class="description">{item.description || 'No description :('}</p>
      <div class="controls">
        <CircleButton on:click={() => select()}>
          <i class="fas fa-play fa-2x" />
        </CircleButton>
        <CircleButton on:click={() => selected.reset()}>
          <i class="fas fa-times fa-2x" />
        </CircleButton>
      </div>
      <div class="upload">
        <div class="text-mid-grey">
          {item.userName} • {item.uploadTime}
        </div>
      </div>
    </div>
  </div>
</div>

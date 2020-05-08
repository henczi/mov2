<script>
  import { createEventDispatcher } from "svelte";
  import { focusable } from "../../../helpers/focusable";

  import { send, receive } from "../item-transition.js";

  const dispatch = createEventDispatcher();

  export let item;
  let placeholderImage =
    "https://via.placeholder.com/350x200/333333/ACACAC/?text=No+Image";

  function select() {
    dispatch('select');
  }
</script>

<style>
  .card {
    cursor: pointer;
    transform: scale(0.95);
    transition: 250ms transform ease;
    height: 100%;
    overflow: hidden;
  }

  .card:focus {
    background-color: var(--color-white);
    color: var(--color-dark);
  }

  .card:focus,
  .card:hover {
    transform: none;
  }

  .card-image {
    position: relative;
  }

  .card-image .image {
    height: 16rem;
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

  .info {
    padding: 1rem 1.5rem;
  }

  .title {
    font-weight: bold;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .upload {
    margin-top: auto;
    padding: 0.5rem 1.5rem;
    border-top: 1px solid var(--color-mid-grey);
  }
</style>

<div
  use:focusable={select}
  on:click={select}
  class="card fley text-lighter"
  in:receive|local={{ key: item.href }}
  out:send|local={{ key: item.href }}>
  <div class="card-image">
    <div
      class="image bg-black"
      style="background-image: url({item.image || placeholderImage})" />
    <div class="duration-label text-lighter bg-darker">{item.duration}</div>
  </div>

  <div class="info">
    <div class="title">{item.title}</div>
    {#if false && item.description}
      <p class="description">{item.description}</p>
    {/if}
  </div>
  <div class="upload">
    <div class="text-mid-grey">{item.userName} • {item.uploadTime}</div>
  </div>
</div>

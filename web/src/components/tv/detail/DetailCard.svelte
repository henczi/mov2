<script>
  import { onMount } from 'svelte';
  import { goto } from '@sapper/app';
  import { selected } from "../selected-store.js"
  import CircleButton from "../../elements/CircleButton.svelte";
  export let item;
  let placeholderImage = "https://via.placeholder.com/350x200/333333/ACACAC/?text=No+Image";

  import { send, receive } from '../item-transition.js';

  let rootEl;

  function select() {
    goto('/player?src=' + item.href);
  }

  onMount(() => {
    setTimeout(() => rootEl.querySelector('.focusable').focus());
  })
</script>

<style>
  .overlay {
    background-color: rgba(0, 0, 0, 0.7)
  }
  .details {
    min-width: 30rem;
  }
</style>

<div class="overlay fixed top-0 left-0 h-full w-full p-10 flex items-center justify-center" bind:this={rootEl} >
  <div class="card p-10 flex overflow-hidden bg-gray-800 text-gray-100" in:receive|local={{key:item.href}} out:send|local={{key:item.href}} style="max-width:1200px">
    <div class="relative flex-shrink-0" style="width: 34rem; height: 20rem;">
      <div
      class="w-full h-full bg-black bg-cover bg-no-repeat bg-center"
      style="background-image: url({item.image || placeholderImage})" />
      <div class="absolute bottom-0 right-0 mb-2 mr-3 px-2 py-1 rounded text-sm text-gray-100 bg-gray-900">
        {item.duration}
      </div>
    </div>
    
    <div class="details ml-20 flex flex-col">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{item.title}</div>
        <p class="text-base">{item.description || 'No description :('}</p>
      </div>
      <div class="mt-auto flex justify-around mb-5">
        <CircleButton on:click={() => select()}><i class="fas fa-play fa-2x"></i></CircleButton>
        <CircleButton on:click={() => selected.reset()}><i class="fas fa-times fa-2x"></i></CircleButton>
      </div>
      <div class="px-6 py-2 border-t border-gray-700">
        <div class="text-gray-600">{item.userName} • {item.uploadTime}</div>
      </div>
    </div>
  </div>
</div>

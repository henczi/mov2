<script>
  export let item;
  let placeholderImage = "https://via.placeholder.com/350x200/333333/ACACAC/?text=No+Image";
</script>

<style>
  .card {
    cursor: pointer;
    transform: scale(0.95);
    transition: 250ms transform ease;
  }

  .card:focus, .card:hover {
    transform: none;
  }
</style>

<div tabindex="0" class="card h-full flex flex-col overflow-hidden text-gray-100 outline-none focus:bg-white focus:text-gray-800" style="width: 28rem">
  <div class="relative">
    <div
    class="h-64 bg-black bg-cover bg-no-repeat bg-center"
    style="background-image: url({item.image || placeholderImage})" />
    <div class="absolute bottom-0 right-0 mb-2 mr-3 px-2 py-1 rounded text-sm text-gray-100 bg-gray-900">
      {item.duration}
    </div>
  </div>
  
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{item.title}</div>
    {#if false && item.description}
      <p class="text-base">{item.description}</p>
    {/if}
  </div>
  <div class="mt-auto px-6 py-2 border-t border-gray-700">
    <div class="text-gray-600">{item.userName} • {item.uploadTime}</div>
  </div>
</div>

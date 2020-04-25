<script>
  import Card from "./VideoCard.svelte";
  export let headerText;
  export let headerImage;
  export let searchBase;
  export let term;

  let currentUnpagedQuery;

  let shelf = {
    loading: false,
    totalCount: 0,
    hasMore: false,
    nextPage: undefined,
    list: undefined
  };

  function search(term) {
    shelf.list = [];
    currentUnpagedQuery = `${searchBase}?search=${term}`;
    page();
  }

  function page(p) {
    shelf.loading = true;
    fetch(currentUnpagedQuery + (p != null ? `&page=${p}` : ""))
      .then(x => x.json())
      .then(x => {
        shelf.totalCount = x.totalCount;
        shelf.hasMore = x.nextPage && x.nextPage !== x.currentPage;
        shelf.nextPage = x.nextPage;
        shelf.list = [...shelf.list, ...x.items];
        shelf.loading = false;
      });
  }
  
  $: search(term);
</script>

<div class="shelf my-5">
  {#if headerText}
    <div class="shelf-header text-white font-bold text-4xl">{headerText}</div>
  {:else}
  <div
    class="shelf-header h-8"
    style="background: url('{headerImage}') no-repeat; background-size: contain;" />
  {/if}
  <div class="shelf-content py-4 flex overflow-x-auto">
    {#if shelf.list && shelf.list.length}
      {#each shelf.list as item}
        <div class="card-container pr-4">
          <Card {item} />
        </div>
      {/each}
      {#if shelf.hasMore && !shelf.loading}
        <div class="pr-5 flex">
          <button on:click={() => page(shelf.nextPage)}
            class="self-center text-center flex-shrink-0 w-20 h-20 m-5 p-3
            rounded-full bg-gray-900 text-gray-100 outline-none focus:bg-gray-100
            focus:text-gray-900">
            <i class="fas fa-3x fa-chevron-right" />
          </button>
        </div>
      {/if}
    {:else if !shelf.loading}
      <div class="self-center text-gray-500 text-4xl font-bold">
        No content :(
      </div>
    {/if}
    {#if shelf.loading}
      <div class="self-center pr-5 text-gray-300 fa-5x">
        <i class="fas fa-circle-notch fa-spin" />
      </div>
    {/if}
  </div>
</div>

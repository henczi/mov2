<script>
  import { createEventDispatcher } from "svelte";
  import { focusable } from "$lib/helpers/focusable";
  import Link from "$lib/elements/Link.svelte";

  import { send, receive } from "../item-transition.js";

  const dispatch = createEventDispatcher();

  export let item;
  export let posterAspectRatio = 16/9;
  let placeholderImage =
    "https://via.placeholder.com/350x200/333333/ACACAC/?text=No+Image";

  let imdb;

  async function loadImdb(id) {
    const resp = await fetch('http://www.omdbapi.com/?apikey=fd161998&i='+id).then(x => x.json());
    imdb = {
      id,
      year: resp.Year,
      runtime: resp.Runtime,
      seasons: resp.totalSeasons,
      genre: resp.Genre,
      poster: resp.Poster,
      rating: resp.imdbRating,
      metascore: resp.Metascore,
      rotten: resp.Ratings.find(x => x.Source === 'Rotten Tomatoes')?.Value,
    }
    item.imdb = imdb;
  }

  $: item.imdb && loadImdb(item.imdb);

  function select() {
    dispatch('select');
  }
</script>

<style>
  .card {
    cursor: pointer;
    height: 100%;
    padding: 4px;
  }

  .card:focus .card-image {
    outline: 4px solid white;
  }

  .card:focus .card-image,
  .card:hover .card-image {
    transform: none;
  }

  .card-image {
    position: relative;
    transform: scale(0.95);
    transition: 250ms transform ease;
    border-radius: 12px;
    box-shadow: 0 0 20px 0 black;
  }

  .card-image .image {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 12px;
  }

  .card-image .overlay-data {
    position: absolute;
    font-size: 0.875rem;
    margin: 0.5rem 0.5rem 0.5rem 0.5rem;
    padding: 0.5rem 0.75rem;
    border-radius: 12px;
    background-color: rgba(0,0,0,0.8);
    font-weight: bold;
  }

  .overlay-data.duration {
    top: 0;
    right: 0;
  }

  .overlay-data.year {
    left: 0;
    top: 0;
  }

  .overlay-data.rating {
    right: 0;
    bottom: 0;
  }

  .card-info {
    margin-top: .75rem;
    border-radius: 12px;
    padding: .5rem .75rem;
  }

  .info {
    padding: 0;
  }

  .title {
    font-weight: bold;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .upload {
    margin-top: auto;
    text-align: right;
  }
</style>

<div
  use:focusable={select}
  class="card fley text-lighter"
  in:receive|local={{ key: item.href }}
  out:send|local={{ key: item.href }}>
  <Link href="/watch?v={item.href}">
    <div class="card-image">
      <div
        class="image bg-black"
        style="aspect-ratio:{posterAspectRatio}; background-image: url({item.image || placeholderImage})" />
      {#if imdb}
        <div class="overlay-data year">{imdb.year}</div>
        <a href="https://imdb.com/title/{imdb.id}" target="_blank" on:click|stopPropagation>
          <div class="overlay-data rating">
            {imdb.rating !== 'N/A' ? imdb.rating : '?'}
            {#if imdb.metascore && imdb.metascore !== 'N/A'} • {imdb.metascore}{/if}
            {#if imdb.rotten && imdb.rotten !== 'N/A'} • {imdb.rotten}{/if}
          </div>
        </a>
      {/if}
      <div class="overlay-data duration">
        {#if imdb?.runtime && imdb.runtime !== 'N/A'}
          {#if imdb?.seasons}{imdb.seasons} se • {/if}{imdb.runtime}
        {:else}
          {item.duration}
        {/if}
      </div>
    </div>
  </Link>

  <div class="card-info flex-grow">
    <div class="info">
      <Link href="/watch?v={item.href}">
        <div class="title">{item.title}</div>
      </Link>
      {#if item.description}
        <p class="description">{item.description}</p>
      {/if}
    </div>
    {imdb?.genre ?? ''}
    <div class="upload">
      {#if item.userName}
        <div class="text-mid-grey">{item.userName} • {item.uploadTime}</div>
        {:else}
        <div class="text-mid-grey">{item.uploadTime}</div>
      {/if}
    </div>
  </div>
</div>

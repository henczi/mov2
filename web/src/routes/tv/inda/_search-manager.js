import { createSearchManager } from "$lib/tv/search-store.js";

let inited = false;

const manager = createSearchManager("/api/inda/search", false);

function search(p) {
  manager.search(p);
}


function init(s) {
  inited || (inited = true) && search(s || { term: '' });
}

export {
  manager,
  search,
  init,
}

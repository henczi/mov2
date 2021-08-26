import { createSearchManager } from "$lib/tv/search-store.js";

let inited = false;

const manager = createSearchManager("/api/videa/search", false);

function search(p) {
  manager.search(p);
}


function init() {
  inited || (inited = true) && search({ term: '' });
}

export {
  manager,
  search,
  init,
}

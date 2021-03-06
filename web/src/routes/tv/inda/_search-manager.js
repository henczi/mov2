import { createSearchManager } from "../../../components/tv/search-store.js";

let inited = false;

const manager = createSearchManager("/api/inda/search", false);

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

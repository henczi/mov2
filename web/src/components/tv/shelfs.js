import { createSearchManager } from "./search-store.js";

let inited = false;

const shelfs = {
  // mock: createSearchManager("/api/mock/search"),
  inda: createSearchManager("/api/inda/search"),
  videa: createSearchManager("/api/videa/search"),
};

function search(params) {
  Object.keys(shelfs).forEach(x => shelfs[x].search(params));
}

function initShelfs() {
  inited || (inited = true) && search({ term: '' });
}

export {
  shelfs,
  search,
  initShelfs,
}

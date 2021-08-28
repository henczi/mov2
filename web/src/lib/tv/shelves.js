import { createSearchManager } from "./search-store.js";

let inited = false;

const shelves = {
  // mock: createSearchManager("/api/mock/search"),
  inda: createSearchManager("/api/inda/search"),
  videa: createSearchManager("/api/videa/search"),
  mozicsilag: createSearchManager("/api/mozicsillag/search"),
};

function search(params) {
  Object.keys(shelves).forEach(x => shelves[x].search(params));
}

function initShelves(s) {
  inited || (inited = true) && search(s || { term: '' });
}

export {
  shelves,
  search,
  initShelves,
}

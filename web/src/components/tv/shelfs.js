import { createShelf } from "./shelf-store.js";

let inited = false;

const shelfs = {
  mock: createShelf("/api/mock/search"),
  inda: createShelf("/api/inda/search"),
  videa: createShelf("/api/videa/search"),
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

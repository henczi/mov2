import { createShelf } from "../../../components/tv/shelf-store.js";

let inited = false;

const shelf = createShelf("/api/inda/search", false);

function search(p) {
  shelf.search(p);
}


function init() {
  inited || (inited = true) && search({ term: '' });
}

export {
  shelf as manager,
  init,
}

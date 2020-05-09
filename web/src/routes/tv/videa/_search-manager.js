import { createShelf } from "../../../components/tv/shelf-store.js";

let inited = false;

const shelf = createShelf("/api/videa/search", false);

function search(p) {
  shelf.search(p);
}


function init() {
  inited || (inited = true) && search({ term: '' });
}

export {
  shelf as manager,
  search,
  init,
}

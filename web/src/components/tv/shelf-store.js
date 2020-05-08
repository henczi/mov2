import { writable } from 'svelte/store';

const tap = fn => v => (fn(v), v);

function createShelf(searchBase, preserve = true) {
  let currentUnpagedQuery;

	const { subscribe, update } = writable({
    loading: true,
    totalCount: 0,
    hasMore: false,
    nextPage: undefined,
    list: undefined
  });

  const tapUpdate = fn => update(tap(fn));

  function search(params) {
    tapUpdate(shelf => shelf.list = []);
    const options = params.options || {};
    const optionsQuery = Object.keys(options).map(key => `&${key}=${options[key]}`);
    currentUnpagedQuery = `${searchBase}?search=${params.term}${optionsQuery}`;
    page();
  }

  function page(p) {
    tapUpdate(shelf => shelf.loading = true);
    fetch(currentUnpagedQuery + (p != null ? `&page=${p}` : ""))
      .then(x => x.json())
      .then(x => {
        tapUpdate(shelf => {
          shelf.totalCount = x.totalCount;
          shelf.hasMore = x.nextPage && x.nextPage !== x.currentPage;
          shelf.currentPage = x.currentPage;
          shelf.previousPage = x.previousPage;
          shelf.nextPage = x.nextPage;
          if (preserve)
            shelf.list = [...shelf.list, ...x.items];
          else
            shelf.list = [...x.items]
          shelf.loading = false;
        });
      });
  }

	return {
    subscribe,
    search,
    page,
	};
}

export { createShelf };
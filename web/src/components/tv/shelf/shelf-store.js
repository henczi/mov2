import { writable } from 'svelte/store';

const tap = fn => v => (fn(v), v);

function createShelf(searchBase) {
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
    currentUnpagedQuery = `${searchBase}?search=${params.term}`
    if (params.uploadedAt) currentUnpagedQuery += `&age=${params.uploadedAt}`;
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
          shelf.nextPage = x.nextPage;
          shelf.list = [...shelf.list, ...x.items];
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
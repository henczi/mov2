import { writable } from 'svelte/store';

const tap = fn => v => (fn(v), v);

function createSearchManager(searchBase, preserve = true) {
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
    tapUpdate(o => o.list = []);
    const options = params.options || {};
    const optionsQuery = Object.keys(options).map(key => `&${key}=${options[key]}`).join('');
    currentUnpagedQuery = `${searchBase}?search=${params.term || ''}${optionsQuery}`;
    page();
  }

  function page(p) {
    tapUpdate(o => o.loading = true);
    fetch(currentUnpagedQuery + (p != null ? `&page=${p}` : ""))
      .then(x => x.json())
      .then(x => {
        tapUpdate(o => {
          o.totalCount = x.totalCount;
          o.hasMore = x.nextPage && x.nextPage !== x.currentPage;
          o.currentPage = x.currentPage;
          o.previousPage = x.previousPage;
          o.nextPage = x.nextPage;
          if (preserve)
            o.list = [...o.list, ...x.items];
          else
            o.list = [...x.items]
          o.loading = false;
        });
      });
  }

	return {
    subscribe,
    search,
    page,
	};
}

export { createSearchManager };
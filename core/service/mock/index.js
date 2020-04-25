const pageSize = 10;

async function search(term, page = 1) {
  page = +page;
  const totalCount = 5 + term.length * term.length;
  let remaining = totalCount - ((page - 1) * pageSize);
  let nextPage = remaining > pageSize ? (page + 1) : undefined;
  Array(remaining > pageSize ? pageSize : remaining).fill(0)
  const json = {
    totalCount: totalCount,
    currentPage: page,
    previousPage: page > 1 ? (page - 1) : undefined,
    nextPage,
    items: Array(remaining > pageSize ? pageSize : remaining).fill(0).map((x, i) => ({
      title: 'Mock' + term + ' cím ' + (i + page * pageSize + 1),
      href: '',
      duration: (i + page * pageSize + 1) + ':00',
      uploadTime: (pageSize - i) + 'éve',
      userName: 'user-' + term
    })),
  }
  return json;
}

module.exports = {
  search
}
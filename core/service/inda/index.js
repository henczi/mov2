const fetch = require('node-fetch');
const xray = require('x-ray');

const requestHeaders = { 'Cookie': '', 'User-Agent': 'curl' };

const x = xray({
  filters: {
    trim: v => v && v.trim(),
    splitSpaceFirst: v => v && v.split(' ')[0],
    splitSlashLast: v => v && v.split('/').pop(),
    parseUrlFromStyle: v => v && (v.match(/url\((.*?)\)/) || [])[1] || null,
    parsePageNumber: v => v && (v.match(/&apos;p_uni&apos;,&apos;(.*?)&apos;/) || [])[1] || null
  }
})
.driver((ctx) => fetch(ctx.url, { method: 'GET', headers: requestHeaders }).then(x => x.text()))

async function search(options = {}) {
  let url = `https://indavideo.hu/search?isAJAXrequest=1`;
  if (options.search) url += `&search=${options.search}`;
  if (options.page) url += `&p_uni=${options.page}`;
  if (options.sort) url += `&sort_mode=${options.sort}`;
  if (options.category) url += `&channel_constraint=${options.channel}`;
  if (options.channel) url += `&user_constraint=${options.channel}`;
  else if (options.user) url += `&user_constraint=${options.user}`;
  if (options.age) url += `&age=${options.age}`;
  if (options.highlight) url += `&highlight=1`;
  if (options.adult) url += `&adult=1`;
  
  const json = await x(url, '.items', {
    totalCount: '.page_title | splitSpaceFirst',
    currentPage: '.pager_inner > div > strong',
    firstPage: '.btn_first.branded_pager_btn@html | parsePageNumber',
    previousPage: '.btn_previous.branded_pager_btn@html | parsePageNumber',
    nextPage: '.btn_next.branded_pager_btn@html | parsePageNumber',
    lastPage: '.btn_last.branded_pager_btn@html | parsePageNumber',
    items: x('.item.TYPE_8', [
      {
        title: '.title | trim',
        href: '.title@href',
        image: '.myvideos_tmb@style | parseUrlFromStyle',
        duration: '.duration | trim',
        description: '.description | trim',
        uploadTime: '.upload_time | trim',
        userId: 'a.username | splitSlashLast | trim',
        userName: 'a.username | trim'
      }
    ])
  })
  return json;
}


module.exports = {
  search
}
const fetch = require('node-fetch');
const xray = require('x-ray');

const searchRequestBase = 'https://indavideo.hu/search?isAJAXrequest=1';
const requestHeaders = { 'Cookie': '', 'User-Agent': 'curl' };

const x = xray({
  filters: {
    trim: v => v.trim(),
    splitSpaceFirst: v => v.split(' ')[0],
    splitSlashLast: v => v.split('/').pop(),
    parseUrlFromStyle: v => (v.match(/url\((.*?)\)/) || [])[1] || null,
    parsePageNumber: v => (v.match(/&apos;p_uni&apos;,&apos;(.*?)&apos;/) || [])[1] || null
  }
})
.driver((ctx) => fetch(ctx.url, { method: 'GET', headers: requestHeaders }).then(x => x.text()))

async function search(options = {}) {
  const url = searchRequestBase + Object.keys(options).map(key => `&${key}=${options[key]}`).join('');
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
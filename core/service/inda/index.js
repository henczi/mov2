const fetch = require('node-fetch');
const xray = require('x-ray');

const getVideoInfoBaseUrl = 'http://amfphp.indavideo.hu/SYm0json.php/player.playerHandler.getVideoData/';
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
  if (options.search) url += `&search=${encodeURIComponent(options.search)}`;
  if (options.page) url += `&p_uni=${encodeURIComponent(options.page)}`;
  if (options.sort) url += `&sort_mode=${encodeURIComponent(options.sort)}`;
  if (options.category) url += `&channel_constraint=${encodeURIComponent(options.channel)}`;
  if (options.channel) url += `&user_constraint=${encodeURIComponent(options.channel)}`;
  else if (options.user) url += `&user_constraint=${encodeURIComponent(options.user)}`;
  if (options.age) url += `&age=${encodeURIComponent(options.age)}`;
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

  return {
    provider: 'inda',
    type: 'videos',
    ...json
  };
}


async function getVideoInfo(videoUrl) {
  const pageHTML = await fetch(videoUrl, { headers: requestHeaders }).then(x => x.text());
  const videoId = (pageHTML.match(/player\/video\/(.{10})\"/) || '00')[1];
  const response = await fetch(getVideoInfoBaseUrl + videoId, { headers: requestHeaders }).then(x => x.json())
  
  const sources = ['360', '720', '1080']
    .filter(x => response.data.filesh[x])
    .map(x => ({
      src: response.data.video_files.filter(o => o.includes(`.${x}.mp4`))[0] + '&token=' + response.data.filesh[x],
      mime: 'video/mp4',
      resolution: `${x}p`,
    }));

  return {
    userName: response.data.user_name,
    title: response.data.title,
    videoId,
    sources,
  }
}

module.exports = {
  search,
  getVideoInfo,
}
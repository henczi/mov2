const fetch = require('node-fetch');
const xmlParser = require('fast-xml-parser');
const xray = require('x-ray');

const baseUrl = 'https://mozicsillag.me';
const getVideoInfoBaseUrl = 'https://videa.hu/videaplayer_get_xml.php?v='

const x = xray({
  filters: {
    trim: v => v && v.trim(),
    parsePageNumber: v => v && (v.includes('page') && v.split('=').pop()) || null,
    prependDomain: v => v && (baseUrl + v),
    parseHossz: v => v && (v.match(/Hossz: (\d+ perc)/) || [])[1] || null,
    parseDate: v => v && ((v.match(/(\d{4}\/\d{2}\/\d{2})/) || [])[1] || '').replace(/\//g, '-') || null,
  }
})

async function search(options = {}) {
  const year = (new Date()).getFullYear();
  let orderBy = 'legfrissebb';

  let params = {};
  params['search_type'] = encodeURIComponent(options.type || 0);
  if (options.search) params['search_term'] = encodeURIComponent(options.search);
  if (options.yearFrom && options.yearFrom > 1900 && options.yearFrom < year) params['search_year_from'] = options.yearFrom;
  if (options.yearTo && options.yearTo > 1900 && options.yearTo < year) params['search_year_to'] = options.yearTo;
  const paramsString = Object.keys(params).map(x => `${x}=${params[x]}`).join('&');

  const url = `${baseUrl}/kereses/${orderBy}/${Buffer.from(paramsString).toString('base64')}`;
  const json = await x(url, {
    currentPage: '.pagination .current | trim',
    previousPage: '.pagination .arrow:first-child a@href | parsePageNumber',
    nextPage: '.pagination .arrow:last-child a@href | parsePageNumber',
    items: x('#content-elements ul:not(.pagination) li', [
      {
        title: '.movie-holder .title h2 | trim',
        href: 'a@href',
        image: '.movie-holder img@data-original | prependDomain',
        duration: '.movie-holder .cover-surface | parseHossz',
        uploadTime: '.movie-holder .lastLink | parseDate',
        // year: '.movie-holder .extra .text-left | trim',
      }
    ])
  })

  return {
    provider: 'mozicsillag',
    type: 'movies-series',
    ...json
  };
}

async function getLinks(url) {
  const isSorozat = url.includes('/sorozat/');
  const page = await fetch(url).then(x => x.text());
  const linksPageUrl = page.match(/href\=\"(https?:\/\/filmbirodalmak.com.*?)"/m)[1];

  if (!linksPageUrl) {
    return null;
  }

  let json;
  if (isSorozat) {
    json = await x(linksPageUrl, {
      title: 'h1 | trim',
      description: '.content > p | trim',
      episodes: x('.accordion-episodes', [
        {
          name: '.textHolder | trim',
          links: x('.panel', [
            {
              name: '.link_share | trim',
              id: 'a[target]@href',
              uploadTime: '.uploadedLink_movie | trim',
              lang: '.link_flag@alt',
              uploader: '.uploader_movie | trim',
              views: '.link_views | trim',
            }
          ])
        }
      ])
    });

  } else {
    json = await x(linksPageUrl, {
      title: 'h1 | trim',
      description: '.content > p | trim',
      links: x('.links_holder .panel', [
        {
          name: '.link_share | trim',
          id: 'a[target]@href',
          uploadTime: '.uploadedLink_movie | trim',
          lang: '.link_flag@alt',
          uploader: '.uploader_movie | trim',
          views: '.link_views | trim',
        }
      ])
    });
  }
  return json;
}

module.exports = {
  search,
  getLinks,
}
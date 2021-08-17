const fetch = require('node-fetch');
const xmlParser = require('fast-xml-parser');
const xray = require('x-ray');

const {
  getRandomString,
  gen_code,
  rc4,
  base64Decode,
  strToUtf8Array,
  utf8ArrayToStr
} = require('./helper')

const getVideoInfoBaseUrl = 'https://videa.hu/videaplayer_get_xml.php?v='

const x = xray({
  filters: {
    trim: v => v && v.trim(),
    splitSpaceFirst: v => v && v.split(' ')[0],
    splitSlashLast: v => v && v.split('/').pop(),
    parsePageNumber: v => v && v.split('=').pop()
  }
})

async function search({ search, page = 1, category = 0 }) {
  const params = `sort=0&interval=0&category=${encodeURIComponent(category)}&usergroup=0`;
  const url = `https://videa.hu/video_kereses/${encodeURIComponent(search)}?${params}&page=${encodeURIComponent(page)}`;
  const json = await x(url, {
    totalCount: '.search-keyword > span | splitSpaceFirst',
    currentPage: '.pagination.bottom li.active > a@href | parsePageNumber',
    previousPage: '.pagination.bottom li:first-child > a@href | parsePageNumber',
    nextPage: '.pagination.bottom li:last-child > a@href | parsePageNumber',
    items: x('.col-video', [
      {
        title: '.panel-video-title > a | trim',
        href: '.video-link@href',
        image: '.video-thumbnail@src',
        duration: '.video-length | trim',
        uploadTime: '.panel-video-upload > span | trim',
        userId: '.panel-video-uploader@href | splitSlashLast | trim',
        userName: '.panel-video-uploader | trim'
      }
    ])
  })
  json.previousPage = (json.previousPage !== json.currentPage) ? json.previousPage : null;
  json.nextPage = (json.nextPage !== json.currentPage) ? json.nextPage : null;
  return {
    provider: 'videa',
    type: 'videos',
    ...json
  };
}

async function getVideoInfo(videoUrl) {
  const pageHTML = await fetch(videoUrl).then(x => x.text());
  const videoIdMatch = pageHTML.match(/src=\"\/player\?f=(.*?)\&/);
  if (!videoIdMatch) return {}; // FAIL

  const videoId = videoIdMatch[1];
  const playerHTML = await fetch(`https://videa.hu/videojs_player?f=${videoId}`).then(x => x.text());
  const codeMatch = playerHTML.match(/var _xt = \"(.*?)\"/);
  if (!codeMatch) return {}; // FAIL

  const matchedCode = codeMatch[1];

  const random = getRandomString(8);
  const [a, b] = gen_code(matchedCode);
  // const xml_req = await fetch(`https://videa.hu/videaplayer_get_xml.php?platform=desktop&f=${videoId}&lang=hu&start=0&_s=${random}&_t=${a}`)
  // const header = xml_req.headers.get('X-Videa-XS').trim();
  // const xml_res = await xml_req.text();
  // const data = base64Decode(xml_res)
  // const decode_param = b + random + header;
  
  // const decoded = utf8ArrayToStr(rc4(data, strToUtf8Array(decode_param)))
  
  // const response = xmlParser.parse(decoded, { ignoreAttributes: false });
  
  const xml_req = await fetch(`https://videa.hu/videaplayer_get_xml.php?platform=desktop&f=${videoId}&lang=hu&start=0&_s=${random}&_t=${a}`)
  const xml_res = await xml_req.text();
  const response = xmlParser.parse(xml_res, { ignoreAttributes: false });

  const s = response.videa_video.video_sources.video_source.map
    ? response.videa_video.video_sources.video_source
    : [response.videa_video.video_sources.video_source];
  const h = response.videa_video.hash_values;
  const sources = s.map(x => ({
    src: `https:${x['#text'].replace(/&amp;/g, '&')}?md5=${h['hash_value_' + x['@_name']]}&expires=${x['@_exp']}`,
    resolution: x['@_name'],
    mime: x['@_mimetype'],
    codecs: x['@_codecs'],
  }));

  return {
    userName: null,
    title: response.videa_video.video.title,
    videoId,
    sources,
  }
}

module.exports = {
  search,
  getVideoInfo,
}
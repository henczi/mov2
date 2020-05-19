const fetch = require('node-fetch');
const xmlParser = require('fast-xml-parser');
const xray = require('x-ray');

const getVideoInfoBaseUrl = 'https://videa.hu/videaplayer_get_xml.php?v='

const x = xray({
  filters: {
    trim: v => v && v.trim(),
    splitSpaceFirst: v => v && v.split(' ')[0],
    splitSlashLast: v => v && v.split('/').pop(),
    parsePageNumber: v => v && v.split('=').pop()
  }
})

async function search(term, page = 1) {
  const url = `https://videa.hu/video_kereses/${encodeURIComponent(term)}?page=${encodeURIComponent(page)}`;
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
  const videoId = (pageHTML.match(/player\/v\/(.{16})\?/) || '00')[1];
  const responseXml = await fetch(getVideoInfoBaseUrl + videoId).then(x => x.text())

  const response = xmlParser.parse(responseXml, { ignoreAttributes: false });

  const s = response.videa_video.video_sources.video_source.map
    ? response.videa_video.video_sources.video_source
    : [response.videa_video.video_sources.video_source];
  const sources = s.map(x => ({
    src: `https:${x['#text'].replace(/&amp;/g, '&')}`,
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
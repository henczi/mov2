const fetch = require('node-fetch');
const xray = require('x-ray');

const x = xray({
  filters: {
    trim: v => v && v.trim(),
    splitSpaceFirst: v => v && v.split(' ')[0],
    splitSlashLast: v => v && v.split('/').pop(),
    parsePageNumber: v => v && v.split('=').pop()
  }
})

async function search(term, page = 1) {
  const url = `https://videa.hu/video_kereses/${term}?page=${page}`;
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
  return json;
}

module.exports = {
  search
}
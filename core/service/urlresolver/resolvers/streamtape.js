
const fetch = require('node-fetch');

module.exports = class extends require('../resolver.js') {
  constructor() {
    super();
    this.pattern = /(?:\/\/|\.)(str(?:eam)?tap?e?\.(?:com|cloud|net|pe))\/(?:e|v)\/([0-9a-zA-Z]+)/;
  }

  async getVideoInfo({ mediaId }) {
    const html = await fetch(`https://streamtape.net/e/${mediaId}`).then(x => x.text());

    const url = html.match(/ById\('.*?(\/get_video.*?)['"]\)/)[1];

    const redirectLocation = (await fetch('https://streamtape.net' + url, { redirect: 'manual' })).headers.get('Location');

    const sources = [{
      src: redirectLocation,
      mime: 'video/mp4',
      resolution: '360p'
    }]

    return {
      userName: undefined,
      title: 'Video',
      videoId: mediaId,
      sources
    }

  }
}
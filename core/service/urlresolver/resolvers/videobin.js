
const fetch = require('node-fetch');

module.exports = class extends require('../resolver.js') {
  constructor() {
    super();
    this.pattern = /^https?:\/\/(videobin\.co)\/(?:embed-|source\/)?([0-9a-zA-Z]+)/;
  }

  async getVideoInfo({ mediaId }) {
    const html = await fetch(`https://videobin.co/embed-${mediaId}.html`).then(x => x.text());

    const sourcesRaw = html.match(/sources: *\[(.*?)\]/)[1];
    const sources = [...sourcesRaw.match(/".*?"/g)].map(x => ({ src: x.slice(1, -1) }))

    return {
      userName: undefined,
      title: 'Video',
      videoId: mediaId,
      sources
    }

  }
}
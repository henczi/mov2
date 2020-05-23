
const fetch = require('node-fetch');

module.exports = class extends require('../resolver.js') {
  constructor() {
    super();
    this.pattern = /^https?:\/\/(vidoza\.net)\/(?:embed-)?([0-9a-zA-Z]+)/;
  }

  async getVideoInfo({ mediaId }) {
    const html = await fetch(`https://vidoza.net/embed-${mediaId}.html`).then(x => x.text());

    const sourcesRaw = html.match(/sourcesCode: *\[(.*?)\]/)[1];
    const sources = sourcesRaw.split('}').map(x => {
      const matched = x.match(/src: *"(http.*?)" *, *type: *"(.*?)".*?res: *"(\d+)"/);
      if (!matched) return null;
      const [_, src, mime, res] = matched;
      return { src, mime, resolution: res + 'p' }
    }).filter(x => !!x);

    return {
      userName: undefined,
      title: 'Video',
      videoId: mediaId,
      sources
    }

  }
}
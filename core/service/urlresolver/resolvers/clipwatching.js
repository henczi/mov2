
const fetch = require('node-fetch');

module.exports = class extends require('../resolver.js') {
  constructor() {
    super();
    this.pattern = /^https?:\/\/(clipwatching.com)\/(?:embed-)?(\w+)/;
  }

  async getVideoInfo({ mediaId }) {
    const html = await fetch(`https://clipwatching.com/embed-${mediaId}.html`).then(x => x.text());

    const sourcesRaw = html.match(/sources: *\[(.*?)\]/)[1];
    const sources = sourcesRaw.split('}').map(x => {
      const matched = x.match(/file: *"(http.*?)" *(, *label: *"(.*?)")?/);
      if (!matched) return null;
      const [_, src, _2, resolution] = matched;
      return { src, resolution }
    }).filter(x => !!x);

    return {
      userName: undefined,
      title: 'Video',
      videoId: mediaId,
      sources
    }

  }
}
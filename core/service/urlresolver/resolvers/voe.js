
const fetch = require('node-fetch');

module.exports = class extends require('../resolver.js') {
  constructor() {
    super();
    this.pattern = /^https?:\/\/(voe\.sx)\/(?:embed-)?([0-9a-zA-Z]+)/;
  }

  async getVideoInfo({ mediaId }) {
    const html = await fetch(`https://voe.sx/${mediaId}`).then(x => x.text());

    const hlsSource = html.match(/'hls': ?'(http.*?)',/)[1];
    const videoHeight = html.match(/'video_height': ?([0-9]+),/)[1];

    const sources = [{
      src: hlsSource,
      mime: 'video/mp4',
      resolution: `${videoHeight}p`
    }]

    return {
      userName: undefined,
      title: 'Video',
      videoId: mediaId,
      sources
    }

  }
}
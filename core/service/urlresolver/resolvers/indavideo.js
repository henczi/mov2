
const inda = require('../../inda/index.js');

module.exports = class extends require('../resolver.js') {
  constructor() {
    super();
    this.pattern = /^https?:\/\/(?:[a-z]*\.)?(indavideo\.hu)\/(?:player\/video|video)\/([0-9A-Za-z-_]+)/;
  }

  async getVideoInfo({ mediaId }) {
    return await inda.getVideoInfo(`https://indavideo.hu/video/${mediaId}`);
    // return await inda.getVideoInfo(`https://embed.indavideo.hu/player/video/${mediaId}`);
  }
}
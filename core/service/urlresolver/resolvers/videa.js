
const videa = require('../../videa/index.js');

module.exports = class extends require('../resolver.js') {
  constructor() {
    super();
    this.pattern = /^https?:\/\/((?:videa|videakid)\.hu)\/(?:player\/?\?v=|player\/v\/|videok\/)(?:.*-|)([0-9a-zA-Z_]+)/;
  }

  async getVideoInfo({ mediaId }) {
    return await videa.getVideoInfo(`https://videa.hu/videok/${mediaId}`);
  }
}
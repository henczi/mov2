
const fetch = require('node-fetch');
const ApiError = require('../../../error/api-error.js');


module.exports = class extends require('../resolver.js') {
  constructor() {
    super();
    this.pattern = /(?:\/\/|\.)(streamlare\.com)\/(?:e|v)\/([0-9a-zA-Z]+)/;
  }

  async getVideoInfo({ mediaId }) {
    const json = await fetch(`https://streamlare.com/api/video/get`, {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "content-type": "application/json;charset=UTF-8",
      },
      "body": JSON.stringify({ id: mediaId }),
      "method": "POST",
    }).then(x => x.json());

    if (json.status !== 'success')
      throw new ApiError('Can not get video info')

    const sources = [{
      src: json?.result?.Original?.src,
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
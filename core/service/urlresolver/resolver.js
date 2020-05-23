module.exports = class {

  canResolve(url) {
    return this.pattern && url.match(this.pattern) || false;
  }

  getHostAndMediaIdFromUrl(url) {
    const [_, host, mediaId] = url.match(this.pattern);
    return { host, mediaId };
  }

  async resolve(url) {
    if (!this.canResolve(url)) return null;
    const { host, mediaId } = this.getHostAndMediaIdFromUrl(url);
    return await this.getVideoInfo({ mediaId, host, url });
  }

  async getVideoInfo(params) {
    return null;
  }
}
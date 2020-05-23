const resolvers = {
  clipwatching: new (require('./resolvers/clipwatching.js')),
  videobin: new (require('./resolvers/videobin.js')),
  vidoza: new (require('./resolvers/vidoza.js')),
  indavideo: new (require('./resolvers/indavideo.js')),
  videa: new (require('./resolvers/videa.js')),
}

async function doResolve(url) {
  for(let resolverName in resolvers) {
    const resolver = resolvers[resolverName];
    if (resolver.canResolve(url)) {
      return await resolver.resolve(url);
    }
  }
  return null;
}

module.exports = {
  doResolve
}

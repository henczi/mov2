async function resolver(url) {
    return await fetch(`/api/url-resolver/resolve?l=${url}`).then(x => x.json())
}

export function createLinkManager(linksUrl, linkUrl, createAutoResolver) {

    const autoResolver = createAutoResolver(getLink, resolver)

    async function getLinks(href) {
        return fetch(linksUrl + href).then((x) => x.json())
    }

    async function getLink(href) {
        return fetch(linkUrl + href).then((x) => x.json())
    }

    async function autoResolve(links, updateFn) {
        return await autoResolver(links, updateFn)
    }

    return {
        getLinks,
        getLink,
        autoResolve,
    }
}
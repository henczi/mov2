export function createLinkManager(linksUrl, linkUrl) {

    async function getLinks(href) {
        return fetch(linksUrl + href).then((x) => x.json())
    }

    async function getLink(href) {
        return fetch(linkUrl + href).then((x) => x.json())
    }

    return {
        getLinks,
        getLink
    }
}
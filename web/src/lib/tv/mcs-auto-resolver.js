function mapper(x) {
    const lang = x.lang.toLowerCase();
    let point = 0;
    if (lang.includes('magyar')) point += 5;
    if (lang.includes('magyar') && lang.includes('szinkron')) point += 10;
    if (!lang.includes('mozis')) point += 5;
    if (lang.includes('magyar') && lang.includes('felirat')) point += 3;
    if (lang.includes('hivatalos')) point += 1;

    point *= 10;

    const name = x.name.toLowerCase();

    if (!name.includes('cam')) point += 5;

    point *= 10;

    if (name.includes('indavideo')) point += 10;
    if (name.includes('videa')) point += 10;
    if (name.includes('vidoza')) point += 5;

    return point;
}

function cmp(mapper, a, b) {
    return mapper(b) - mapper(a)
}

export function createMcsAutoResolver(getLink, resolveLink) {
    return async function resolve(links, updateFn) {
        links = links.sort((a, b) => cmp(mapper, a, b));
    
        let index = 0;
        for (const link of links) {
            updateFn(++index, links.length, `${link.name} - ${link.lang}`);
            try {
                const link2 = await getLink(link.href);
                const info = await resolveLink(link2.redirect);
                if (info && !info.error) return [link2.redirect, info];
            } catch {}
        }

        return [undefined, undefined]
    
    }
}
export function serialize(obj) {
    if (typeof obj === 'number' || typeof obj === 'string' || typeof obj === 'boolean') return obj.toString();
    if (typeof obj !== 'object') return '';
    return Object.keys(obj).map(key => `${key}=${encodeURIComponent(serialize(obj[key]))}`).join('&');
}

export function deserialize(str) {
    if(!str.includes('=')) return str;
    return str.split('&').reduce((a, x) => (a[x.split('=')[0]] = deserialize(decodeURIComponent(x.split('=')[1])), a), {});
}
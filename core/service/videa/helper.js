function gen_code(e) {
  let magic_string = 'xHb0ZvME5q8CBcoQi6AngerDu3FGO9fkUlwPmLVY_RTzj2hJIS4NasXWKy1td7p';
  let H1 = e.substr(0, 32)
  let H2 = e.substr(32, 32)

  let Q = '';

  for (let idx = 0; idx < 32; idx++)
    Q += H2.charAt(idx - (magic_string.indexOf(H1.charAt(idx)) - 31));

  return [Q.substr(0, 16), Q.substr(16, 16)];
}


function getRandomString(e) {
  for (var t = "", n = "abcdefghijklmnopqrstuvwxyz0123456789", o = 0; o < e; o++)
    t += n.charAt(Math.floor(Math.random() * n.length));
  return t
}

function strToUtf8Array(e) {
  for (var t = [], n = 0; n < e.length; n++) {
    var o = e.charCodeAt(n);
    o < 128 ? t.push(o) : o < 2048 ? t.push(192 | o >> 6, 128 | 63 & o) : o < 55296 || o >= 57344 ? t.push(224 | o >> 12, 128 | o >> 6 & 63, 128 | 63 & o) : (n++,
      o = 65536 + ((1023 & o) << 10 | 1023 & e.charCodeAt(n)),
      t.push(240 | o >> 18, 128 | o >> 12 & 63, 128 | o >> 6 & 63, 128 | 63 & o))
  }
  return t
}

function utf8ArrayToStr(e) {
  for (var t, n, o, a = 0, r = e.length, l = ""; a < r;)
    switch ((t = e[a++]) >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        l += String.fromCharCode(t);
        break;
      case 12:
      case 13:
        n = e[a++],
          l += String.fromCharCode((31 & t) << 6 | 63 & n);
        break;
      case 14:
        n = e[a++],
          o = e[a++],
          l += String.fromCharCode((15 & t) << 12 | (63 & n) << 6 | (63 & o) << 0)
    }
  return l
}

function rc4(e, t) {
  var n, o, a, r, l, i;
  for (n = [],
    o = 0,
    r = [],
    l = 0; l < 256; l++)
    n[l] = l;
  for (l = 0; l < 256; l++)
    o = (o + n[l] + t[l % t.length]) % 256,
      a = n[l],
      n[l] = n[o],
      n[o] = a;
  for (l = 0,
    o = 0,
    i = 0; i < e.length; i++)
    o = (o + n[l = (l + 1) % 256]) % 256,
      a = n[l],
      n[l] = n[o],
      n[o] = a,
      r.push(e[i] ^ n[(n[l] + n[o]) % 256]);
  return r
}

function base64Decode(e) {
  if (e = e.replace(/\s/g, ""),
    !/^[a-z0-9\+\/\s]+\={0,2}$/i.test(e) || e.length % 4 > 0)
    throw new Error("Not a base64-encoded string.");
  var t, n, o = 0, a = [];
  for (e = e.replace(/=/g, ""); o < e.length;) {
    switch (t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(e.charAt(o)),
    o % 4) {
      case 1:
        a.push(n << 2 | t >> 4);
        break;
      case 2:
        a.push((15 & n) << 4 | t >> 2);
        break;
      case 3:
        a.push((3 & n) << 6 | t)
    }
    n = t,
      o++
  }
  return a
}

module.exports = {
  getRandomString,
  gen_code,
  rc4,
  base64Decode,
  strToUtf8Array,
  utf8ArrayToStr
}
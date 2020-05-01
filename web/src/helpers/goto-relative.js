import { goto } from '@sapper/app';

export function gotoRelative(relativePath) {
  // TODO: ?
  goto(location.pathname.replace(/\/$/, '') + relativePath);
}
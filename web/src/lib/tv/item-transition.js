import { crossfade, scale } from 'svelte/transition';
const [send, receive] = crossfade({
  duration: 500,
  fallback: scale
});

export { send, receive };
export function focusable(/** @type {HTMLElement} */ node, /** @type {Function} */ clickHandler = () => {}) {
  node.classList.add('focusable');
  node.setAttribute('tabindex', '-1');

  const handleEnter = (/** @type {CustomEvent} */ event) => clickHandler(event.detail);
  const scrollIntoView = (/** @type {CustomEvent} */ event) => node.scrollIntoViewIfNeeded ? node.scrollIntoViewIfNeeded(false) : node.scrollIntoView(); // TODO

  node.addEventListener('sn:enter-down', handleEnter);
  node.addEventListener('sn:willfocus', scrollIntoView);

	return {
		destroy() {
      node.removeEventListener('sn:enter-down', handleEnter);
      node.removeEventListener('sn:willfocus', scrollIntoView);
		}
	};
}
export function focusable(/** @type {HTMLElement} */ node, /** @type {Function} */ clickHandler = () => {}) {
  node.classList.add('focusable');
  node.setAttribute('tabindex', '-1');

  const handleClick = (/** @type {MouseEvent} */ event) => clickHandler(event);
  const handleEnter = (/** @type {CustomEvent} */ event) => (clickHandler(event.detail), event.preventDefault());
  const scrollIntoView = (/** @type {CustomEvent} */ event) => node.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  node.addEventListener('click', handleClick);
  node.addEventListener('sn:enter-down', handleEnter);
  node.addEventListener('sn:willfocus', scrollIntoView);

	return {
		destroy() {
      node.removeEventListener('click', handleClick);
      node.removeEventListener('sn:enter-down', handleEnter);
      node.removeEventListener('sn:willfocus', scrollIntoView);
		}
	};
}
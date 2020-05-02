import { writable } from 'svelte/store';

function createSelected() {
	const { subscribe, set } = writable(null);

	return {
		subscribe,
		set,
		reset: () => set(null)
	};
}

export const selected = createSelected();
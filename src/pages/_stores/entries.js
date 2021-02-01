import { writable } from 'svelte/store';
const { subscribe, set, update } = writable({});
export const entries = {
    set: (value) => set(value),
		subscribe,
		reset: () => set({}),
    add: (parents, entry) => update(entries => {
      entries[parents.join("/")] = entry;
      return entries;
		}),
    del: (parents, shortname) => update(entries => {
			return entries[parents.join("/")].delete(shortname);
		}),
		get: (parents, shortname) => { return entries[parents.join("/")][shortname]; },
};

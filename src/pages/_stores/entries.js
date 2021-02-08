import { writable } from 'svelte/store';

const { subscribe, set, update } = writable({});

export const entries = {
    set: (value) => set(value),
		subscribe,
		reset: () => set({}),
    /*add_many: (subpath, items) => update(entries => {
      if(! subpath in entries)
        entries[subpath] = {};

      items.forEach( (item) => {
        entries[subpath][item.shortname] = item;
      });
    }),*/
    add: (subpath, entry) => update(entries => {
      if(!(subpath in entries))
        entries[subpath] = {};
      entries[subpath][entry.shortname] = entry;
      return entries;
		}),
    del: (subpath, shortname) => update(entries => {
			return entries[subpath].delete(shortname);
		}),
		get: (subpath, shortname) => { return entries[subpath][shortname]; },
};

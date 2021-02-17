import { writable } from 'svelte/store';

let initial = {};

const { subscribe, set , update } = writable(initial);

export const entries = {
  set: (value) => set(value),
  subscribe,
  reset: () => set(initial),
  add: (subpath, entry) => update(entries => {
    if(!(subpath in entries))
      entries[subpath] = [];
    entries[subpath].push(entry);
    return entries;
  }),
  del: (subpath) => update(entries => { return entries.delete(subpath); }),
};

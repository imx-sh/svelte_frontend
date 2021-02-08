import { writable, get } from "svelte/store";
const init = {data:null};
const {set, update, subscribe} = writable(init);
export const has_changed = writable(false);

function customSet(new_value) {
  if ((! get(has_changed)) || confirm("Changes haven't been saved.\nDo you want to discard them?")) {
    has_changed.set(false); // Reset has_changed flag
    set(new_value);
  } else {
    console.log("Rejecting new active entry until the user saves changes");
  }
}

function customUpdate(new_value) {
  let old = get(active_entry);
  console.log("Updating store from ... to", old, new_value);
  return new_value;
}

export const active_entry = {
  set: (value) => customSet(value),
  update: () => update(active_entry => customUpdate(active_entry)),
  subscribe,
  reset: () => customSet(init),
};


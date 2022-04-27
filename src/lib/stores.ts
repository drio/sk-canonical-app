import { writable } from 'svelte/store';

export const itemStore: any = writable([
  {
    id: 1,
    created_at: new Date,
    name: "David Rio",
    age: 46
  }
]);
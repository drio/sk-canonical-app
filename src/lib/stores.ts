import { writable } from 'svelte/store';
import { getItems } from "./api";

export const itemStore: any = writable([]);

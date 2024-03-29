import { writable } from 'svelte/store';

export const sortData = writable<number[]>([]);
export const timeout = writable<ReturnType<typeof setTimeout>[]>([]);

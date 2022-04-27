import firstNames from "$lib/first-names";

export function simulateDelay(fx: any, delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fx());
    }, delay + 500 * Math.random());
  });
}

function randomName() {
  const r = "" + Math.random() * firstNames.length;
  return firstNames[parseInt(r, 0)];
}

const randomAge = () => parseInt("" + Math.random() * 100, 0);

const genRandomId = () => Math.round(Math.random() * 100000000)

export function genEmptyItem() {
  return {
    id: genRandomId(),
    created_at: new Date(),
    name: "",
    age: "",
  }
}

export function genRandomItem() {
  return {
    id: genRandomId(),
    created_at: new Date(),
    name: randomName(),
    age: randomAge(),
  }
}

/*
export const getAll = () => simulateDelay([...items]);

export const add = (i: Item) => simulateDelay(itemStore.set([...itemStore, i]));

export const getOne = (id: string | null) => {
  if (!id) return [];
  return items.filter(i => i.id === id);
}

export const del = (id: string) => {
  items = items.filter(i => i.id !== id)
}

export const update = (iToUpdate: Item) => {
  items = [
    ...items.filter(i => i.id !== iToUpdate.id),
    iToUpdate
  ]
}
*/



import firstNames from "$lib/first-names";

const storeMode = import.meta.env.VITE_STORE_MODE;
const Noop = new Promise<void>((r) => r());
const DBMode = storeMode === "db"

// This is an abstration so we can work against memory when in dev mode
// or against a real DB engine when in production
export const requestProm = (fx: any) => DBMode ? fx() : Noop;

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

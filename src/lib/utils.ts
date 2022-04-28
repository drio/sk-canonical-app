import firstNames from "$lib/first-names";

const storeMode = import.meta.env.VITE_STOREMODE;
const Noop = new Promise<void>((r) => r());
const DBMode = storeMode === "db"

// This is an abstration so we can work against memory or the DB
export function requestProm(fx: any) {
  const p = DBMode ? fx() : Noop;
  return p;
}

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

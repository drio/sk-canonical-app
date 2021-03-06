const url = import.meta.env.VITE_URL;

export type Item = {
  id: string;
  created_at: Date;
  name: string;
  age: number;
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function pick(item: Item) {
  return { name: item.name, age: +item.age }
}

export async function getItem(id: number) {
  return delay(300).then(() => fetch(`${url}/v1/items/${id}`));
}

export async function getItems() {
  const p = delay(300).then(() => fetch(`${url}/v1/items`));
  return p
    .then((response) => {
      return response.json();
    })
    .catch(() => {
      return p;
    });
}

export async function addItem(item: Item) {
  return fetch(`${url}/v1/items`, {
    method: "POST",
    body: JSON.stringify(pick(item)),
    headers: new Headers({
      "Content-Type": "application/json; charset=UTF-8",
    }),
  });
}

export async function updateItem(item: Item) {
  return fetch(`${url}/v1/items/${item.id}`, {
    method: "PUT",
    body: JSON.stringify(pick(item)),
    headers: new Headers({
      "Content-Type": "application/json; charset=UTF-8",
    }),
  });
}


export async function deleteItem(id: number) {
  return fetch(`${url}/v1/items/${id}`, {
    method: "DELETE",
    headers: new Headers({
      "Content-Type": "application/json; charset=UTF-8",
    }),
  });
}

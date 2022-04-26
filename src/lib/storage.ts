export type Item = {
	id: string;
  created_at: Date;
	name: string;
	age: number;
};

const keyName = 'drio_canonical_items'
let items: Item[];

export function initStorage() {
	const rawItems = window.localStorage.getItem(keyName)
	if (rawItems) {
		items = JSON.parse(rawItems || '[]')
	} else {
		items = [];
		window.localStorage.setItem(keyName, JSON.stringify(items))
	}
}

const save = (newItems: Item[]) => {
	items = [...newItems];
	window.localStorage.setItem(keyName, JSON.stringify(items))
}

export const getItems = () => items;

export const getItem = (id: string | null) => {
	if (!id) return [];
	const items = getItems();
	if (!items) return []
	if (id !== null) return items.filter(i => i.id === id);
	return []
}

export const deleteItem = (id: string) => save(items.filter(i => i.id !== id))

export const updateItem = (i: Item) => {
	const itemsWithId = items.filter(e => e.id === i.id)
	if (itemsWithId.length !== 1) {
		console.warn("Cannot update: ", itemsWithId)
		return;
	}
	const foundItem = itemsWithId[0];

	save([...items.filter(e => e.id !== i.id), {
		...i,
		...{
			id: foundItem.id,
			created_at: foundItem.created_at
		}
	}])
}

export const addItem = (i: Item) => save([...items, i])

export const cleanStore = () => save([]) 

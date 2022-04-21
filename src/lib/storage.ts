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

export const deleteItem = (id: string) => save(items.filter(i => i.id !== id))

export const updateItem = (i: Item) => save([...items.filter(i => i.id !== i.id), i])

export const addItem = (i: Item) => save([...items, i])

export const cleanStore = () => save([]) 

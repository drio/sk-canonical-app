<script lang="ts">
  import type { Item } from "$lib/storage";
  import { initStorage, getItems, addItem, cleanStore } from "$lib/storage";
  import firstNames from "$lib/first-names";
  import { onMount } from "svelte";

  let items: Item[] = [];

  function randomName() {
    const r = "" + Math.random() * firstNames.length;
    return firstNames[parseInt(r, 0)];
  }

  const randomAge = () => parseInt("" + Math.random() * 100, 0);

  function handleAdd() {
    const item = {
      id: Math.random().toString(16).slice(2),
      created_at: new Date(),
      name: randomName(),
      age: randomAge(),
    };
    console.log(item);
    addItem(item);
    items = [...getItems()];
  }

  function handleClean() {
    cleanStore();
    items = [...getItems()];
  }

  onMount(() => {
    initStorage();
    items = getItems();
  });
</script>

<h1>Welcome to this app</h1>

<div>
  <ul>
    {#each items as { id, name, age }}
      <li>
        <p>{id} {name} {age}</p>
      </li>
    {/each}
  </ul>
</div>

<button on:click={handleAdd}> Add </button>
<button on:click={handleClean}> Clean </button>

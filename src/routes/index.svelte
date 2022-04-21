<script lang="ts">
  import type { Item } from "$lib/storage";
  import {
    initStorage,
    getItems,
    addItem,
    cleanStore,
    deleteItem,
  } from "$lib/storage";
  import firstNames from "$lib/first-names";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let items: Item[] = [];

  function randomName() {
    const r = "" + Math.random() * firstNames.length;
    return firstNames[parseInt(r, 0)];
  }

  const randomAge = () => parseInt("" + Math.random() * 100, 0);

  function handleRandomAdd() {
    const item = {
      id: Math.random().toString(16).slice(2),
      created_at: new Date(),
      name: randomName(),
      age: randomAge(),
    };
    addItem(item);
    items = [...getItems()];
  }

  function handleDelete(id: string) {
    deleteItem(id);
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
  <button on:click={() => window.location.replace("/new")}>new</button>
  <button on:click={handleRandomAdd}> Random Add </button>
  <ul>
    {#each items as { id, name, age }}
      <li in:fade={{ duration: 2000 }}>
        <p>
          {id}
          {name}
          {age}
          <a href="#">edit</a>
          <a href="#" on:click={() => handleDelete(id)}>delete</a>
        </p>
      </li>
    {/each}
  </ul>
</div>

<button on:click={handleClean}> Clean </button>

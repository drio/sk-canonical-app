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

<p class="title">(List of items)</p>

<div>
  <div class="buttons">
    <button on:click={() => window.location.replace("/edit?id=0")}>new</button>
    <button on:click={handleRandomAdd}> Random Add </button>
    <button on:click={handleClean}> Clean </button>
  </div>
  <div>
    {#each items as { id, name, age } (id)}
      <div
        class="entry"
        in:fade={{ duration: 1000 }}
        out:fade={{ duration: 1000 }}
      >
        <div class="entry-data">
          <span class="id">{id}</span>
          <span class="name">{name}</span>
          <span class="age">{age}</span>
        </div>
        <div class="entry-links">
          <a href="/edit?id={id}">edit</a>
          <a href="#" on:click={() => handleDelete(id)}>delete</a>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .buttons {
    padding-bottom: 10px;
  }
  .entry {
    padding: 10px 2px 10px 2px;
    display: flex;
    flex-direction: column;
  }
  .entry-data {
    font-weight: 600;
    border-left: solid 2px lightpink;
    padding-left: 5px;
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  .id {
    color: grey;
    font-weight: 300;
    font-size: 0.7rem;
  }

  .entry-links {
    font-size: 0.8rem;
  }

  .entry-links a {
    color: grey;
  }

  button {
    width: fit-content;
    font-size: 0.7rem;
  }
</style>

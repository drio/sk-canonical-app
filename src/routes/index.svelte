<script lang="ts">
  import type { Item } from "$lib/api.ts";
  import { simulateDelay, genRandomItem } from "$lib/utils.ts";
  import { deleteItem, getItems } from "$lib/api.ts";
  import { itemStore } from "$lib/stores.ts";
  import { onMount, onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { goto } from "$app/navigation";

  async function handleDelete(idToDelete) {
    const fx = $itemStore.filter((i) => i.id !== idToDelete);
    deleteItem(idToDelete).then(() => itemStore.set(fx));
  }

  onMount(() => {
    getItems().then(({ items }) => itemStore.set(items));
  });
  const url = import.meta.env.VITE_URL;
</script>

<div class>
  <p class="title">(List of items)</p>

  <div class="buttons">
    <button on:click={() => goto(`${url}/edit?id=0`)}>new</button>
  </div>

  <div class="list-main-container">
    {#if $itemStore.length > 0}
      {#each $itemStore as item (item)}
        <div class="entry">
          <div class="entry-data">
            <span class="id">{item.id}</span>
            <span class="name">{item.name}</span>
            <span class="age">{item.age}</span>
          </div>
          <div class="entry-links">
            <a href="#" on:click={() => goto(`${url}/edit?id=${item.id}`)}
              >edit</a
            >
            <a href="#" on:click={() => handleDelete(item.id)}>delete</a>
          </div>
        </div>
      {/each}
    {/if}
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
</style>

<script lang="ts">
  import type { Item } from "$lib/api.ts";
  import { simulateDelay, genRandomItem } from "$lib/utils.ts";
  import { itemStore } from "$lib/stores.ts";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { goto } from "$app/navigation";

  function hideAndGo(path) {
    hideContainer = true;
    goto(path);
  }

  async function handleRandomAdd() {
    loading = true;
    const fx = () => itemStore.set([...$itemStore, genRandomItem()]);
    simulateDelay(fx, 100).then(() => (loading = false));
  }

  async function handleDelete(idToDelete) {
    itemStore.set($itemStore.filter((i) => i.id !== idToDelete));
  }

  let loading = false;
  let hideContainer = false;
</script>

<div class:hide-container={hideContainer}>
  <p class="title">(List of items)</p>

  <div class="buttons">
    <button on:click={() => hideAndGo("/edit?id=0")}>new</button>
    <button on:click={handleRandomAdd}> Random Add </button>
    <span class="loading" style:visibility={loading ? "visible" : "hidden"}>
      🐢 ...
    </span>
  </div>

  <div class="list-main-container" class:hide-container={hideContainer}>
    {#if $itemStore.length > 0}
      {#each $itemStore as item (item)}
        <div
          class="entry"
          in:fade={{ duration: 400 }}
          out:fade={{ duration: 400 }}
        >
          <div class="entry-data">
            <span class="id">{item.id}</span>
            <span class="name">{item.name}</span>
            <span class="age">{item.age}</span>
          </div>
          <div class="entry-links">
            <a href="#" on:click={() => hideAndGo(`/edit?id=${item.id}`)}
              >edit</a
            >
            <a href="#" on:click={() => handleDelete(item.id)}>delete</a>
          </div>
        </div>
      {/each}
    {:else}
      <p>No items</p>
    {/if}
  </div>
</div>

<style>
  .loading {
    font-size: 1.5rem;
  }
  .hide-container {
    position: absolute;
    top: -1000px;
    border: color 1px red;
  }

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

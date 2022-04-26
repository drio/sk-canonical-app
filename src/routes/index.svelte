<script lang="ts">
  import type { Item } from "$lib/api.ts";
  import { getItems, addItem, deleteItem } from "$lib/api.ts";
  import firstNames from "$lib/first-names";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let hideContainer = false;
  let error = "";

  function randomName() {
    const r = "" + Math.random() * firstNames.length;
    return firstNames[parseInt(r, 0)];
  }

  const randomAge = () => parseInt("" + Math.random() * 100, 0);

  async function handleRandomAdd() {
    const item = {
      name: randomName(),
      age: randomAge(),
    };
    addItem(item).then(() => (promise = getItems()));
  }

  async function handleDelete(id: number) {
    deleteItem(id).then(() => (promise = getItems()));
  }

  let promise = getItems();
</script>

<p class="title">(List of items)</p>
<div class="buttons">
  <button on:click={() => window.location.replace("/edit?id=0")}>new</button>
  <button on:click={handleRandomAdd}> Random Add </button>
</div>

<div class="list-main-container" class:hide-container={hideContainer}>
  {#await promise then data}
    <div>
      <div>
        {#each data.items as { id, name, age }, idx}
          <div
            class="entry"
            in:fade={{ duration: 400 }}
            out:fade={{ duration: 400 }}
          >
            <div class="entry-data">
              <span class="id">{id}</span>
              <span class="name">{name}</span>
              <span class="age">{age}</span>
            </div>
            <div class="entry-links">
              <a href="/edit?id={id}" on:click={() => (hideContainer = true)}
                >edit</a
              >
              <a href="#" on:click={() => handleDelete(id)}>delete</a>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>

<style>
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

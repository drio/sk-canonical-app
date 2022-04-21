<script lang="ts">
  import type { Item } from "$lib/storage";
  import {
    initStorage,
    getItems,
    getItem,
    addItem,
    updateItem,
  } from "$lib/storage";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  const errorStuff = {
    name: {
      msg: "Name's length has to be 0 > name < 20",
      logic: (n: string) => n.length < 20 && n.length > 0,
    },
    age: {
      msg: "Age has to be between [0, 100]",
      logic: (n: string) => {
        const ni = parseInt(n, 0);
        return ni >= 0 && ni < 100 && n !== "";
      },
    },
  };

  let errors: string[] = [];
  let name: string = "";
  let age: string = "";
  let id = $page.url.searchParams.get("id");

  function persistItem() {
    if (newItem) {
      addItem({
        id: Math.random().toString(16).slice(2),
        created_at: new Date(),
        name,
        age: parseInt(age, 0),
      });
    } else {
      if (id) {
        updateItem({
          id,
          created_at: new Date(),
          name,
          age: parseInt(age, 0),
        });
      }
    }
  }

  function handleAdd() {
    errors = [];

    let r = !errorStuff["name"].logic(name);
    if (r) errors.push(errorStuff["name"].msg);

    r = !errorStuff["age"].logic(age);
    if (r) errors.push(errorStuff["age"].msg);

    if (errors.length === 0) {
      persistItem();
      window.location.replace("/");
    }
  }

  $: editItem = id && id !== "0";
  $: newItem = id && id === "0";
  $: itemFound = id && getItem(id).length === 1;

  onMount(() => {
    initStorage();
    if (id && id !== "0") {
      const r = getItem(id);
      if (r.length === 1) {
        name = r[0].name;
        age = "" + r[0].age;
      }
    }
  });
</script>

<a href="/"> 🔙 </a>
{#if itemFound || newItem}
  {#if editItem}
    <h3>Edit item</h3>
  {:else if newItem}
    <h3>New item</h3>
  {/if}

  <div class="container">
    <label
      >Name:
      <input bind:value={name} />
    </label>
    <label
      >Age:
      <input bind:value={age} />
    </label>
  </div>
  <br />
  {#if errors.length > 0}
    <div class="error">
      Something went wrong.
      <ul>
        {#each errors as e}
          <p>☝ {e}</p>
        {/each}
      </ul>
    </div>
  {/if}
  <button on:click={handleAdd}>{newItem ? "add" : "update"}</button>
{:else}
  <p>Item to edit not found.</p>
{/if}

<style>
  a {
    font-size: 1.5rem;
    text-decoration: none;
  }

  .container {
    padding-bottom: 5px;
  }

  .error {
    color: tomato;
    padding-bottom: 25px;
    font-size: 1.2rem;
    margin: 10px;
    border: solid 1px tomato;
    width: fit-content;
    padding: 10px;
    border-radius: 1rem;
  }

  .error p {
    margin: 0;
  }
  ul {
    padding: 0 0 0 15px;
    margin: 5px 0 5px 0px;
  }

  button {
    width: fit-content;
  }
</style>

<script lang="ts">
  import type { Item } from "$lib/api.ts";
  import { simulateDelay, genEmptyItem } from "$lib/utils.ts";
  import { itemStore } from "$lib/stores.ts";
  import { addItem, updateItem } from "$lib/api.ts";

  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { fade } from "svelte/transition";

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

  function handleAdd() {
    let p;
    if (errors.length === 0) {
      if (newItem) {
        p = addItem(item);
        itemStore.set([...$itemStore, item]);
      } else {
        itemStore.set([...$itemStore.filter((i) => i.id !== item.id), item]);
        p = updateItem(item);
      }
      p.then(goto("/"));
    }
  }

  function inputChange() {
    errors = [];
    let r = !errorStuff["name"].logic(item.name);
    if (r) errors.push(errorStuff["name"].msg);

    r = !errorStuff["age"].logic(item.age);
    if (r) errors.push(errorStuff["age"].msg);

    haveErrors = errors.length > 0;
  }

  function loadItem() {
    const id = $page.url.searchParams.get("id");
    let p;
    if (id && id !== "0") {
      const getItem = () => {
        const items = $itemStore.filter((i) => i.id == +id);
        return items.length === 1 ? items[0] : null;
      };
      p = simulateDelay(getItem, 1);
      newItem = false;
    } else {
      newItem = true;
      p = simulateDelay(genEmptyItem, 1);
    }

    p.then((i) => (item = i));
  }

  let item;
  let errors: string[] = [];
  let newItem;
  loadItem();

  $: what = $page.url.searchParams.get("id") === "0" ? "New" : "Edit";
  $: haveErrors = errors && errors.length > 0;
</script>

<p class="title">({what} item)</p>

{#if item}
  <div transtion:fade={{ duration: 1000 }}>
    <a href="/"> 🔙 </a>
    <div class="container">
      <label>Name: </label>
      <input bind:value={item.name} on:input={inputChange} />
      <label>Age:</label>
      <input bind:value={item.age} on:input={inputChange} />
    </div>

    <br />

    {#if !haveErrors}
      <button on:click={handleAdd} in:fade={{ duration: 500 }}
        >{newItem ? "add" : "update"}</button
      >
    {:else}
      <div class="error" transition:fade={{ duration: 200 }}>
        ☝ Something went wrong.
        <ul>
          {#each errors as e}
            <p>{e}</p>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
{:else}
  <p>Loading ...</p>
{/if}

<style>
  a {
    font-size: 1.2rem;
    text-decoration: none;
  }

  .container {
    display: flex;
    flex-direction: column;
    padding: 5px 0 5px 0;
  }

  label {
    font-size: 0.9rem;
    padding: 5px 0 5px 0;
  }

  input {
    width: 300px;
    border: solid 1px lightgrey;
  }

  .error {
    color: tomato;
    font-size: 1rem;
    border: solid 0px tomato;
    width: fit-content;
    border-radius: 1rem;
  }
</style>

<script lang="ts">
  import type { Item } from "$lib/api.ts";
  import { getItem, addItem, deleteItem } from "$lib/api.ts";

  import { onMount } from "svelte";
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

  function persistItem() {
    if (newItem) {
      addItem({
        name,
        age: parseInt(age, 0),
      });
    } else {
      if (id) {
        updateItem({
          name,
          age: parseInt(age, 0),
        });
      }
    }
  }

  function handleAdd() {
    if (errors.length === 0) {
      persistItem();
      window.location.replace("/");
    }
  }

  function inputChange() {
    errors = [];
    let r = !errorStuff["name"].logic(name);
    if (r) errors.push(errorStuff["name"].msg);

    r = !errorStuff["age"].logic(age);
    if (r) errors.push(errorStuff["age"].msg);

    haveErrors = errors.length > 0;
  }

  function loadData() {
    // TODO: we have promisses
  }

  let errors: string[] = [];
  let name: string = "";
  let age: string = "";
  let id = $page.url.searchParams.get("id");
  let ready = false;
  let haveErrors = false;

  let editItem = false;
  let newItem = true;
  let itemFound = true;
  let what = "edit";
  ready = true;
  //let promise = loadData();

  /*
  $: editItem = id && id !== "0";
  $: newItem = id && id === "0";
  $: itemFound = id !== "0" && getItem(id).length === 1;
  $: what = newItem ? "New" : "Edit";
  */
</script>

{#if ready}
  <div transtion:fade={{ duration: 500 }}>
    <p class="title">({what} item)</p>

    <a href="/"> 🔙 </a>
    {#if itemFound || newItem}
      <div class="container">
        <label>Name: </label>
        <input bind:value={name} on:input={inputChange} />
        <label>Age:</label>
        <input bind:value={age} on:input={inputChange} />
      </div>
      <br />
      {#if !haveErrors}
        <button on:click={handleAdd} in:fade={{ duration: 500 }}
          >{newItem ? "add" : "update"}</button
        >
      {/if}
      {#if haveErrors}
        <div class="error" transition:fade={{ duration: 200 }}>
          ☝ Something went wrong.
          <ul>
            {#each errors as e}
              <p>{e}</p>
            {/each}
          </ul>
        </div>
      {/if}
    {:else}
      <p>Item to edit not found.</p>
    {/if}
  </div>
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

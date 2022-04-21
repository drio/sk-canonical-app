<script lang="ts">
  import type { Item } from "$lib/storage";
  import { initStorage, getItems, addItem } from "$lib/storage";
  import { onMount } from "svelte";

  const errorStuff = {
    name: {
      msg: "Name's length has to be 0 > name < 10",
      logic: (n: string) => n.length < 10 && n.length > 0,
    },
    age: {
      msg: "Age has to be between [0, 100]",
      logic: (n: string) => {
        const ni = parseInt(n, 0);
        return ni >= 0 && ni < 100 && n !== "";
      },
    },
  };

  let items: Item[] = [];
  let errors: string[] = [];
  let name: string = "";
  let age: string = "";

  function handleAdd() {
    errors = [];

    let r = !errorStuff["name"].logic(name);
    if (r) errors.push(errorStuff["name"].msg);

    r = !errorStuff["age"].logic(age);
    if (r) errors.push(errorStuff["age"].msg);
    console.log("asdfasdf77", errors);

    if (errors.length === 0) {
      addItem({
        id: Math.random().toString(16).slice(2),
        created_at: new Date(),
        name,
        age: parseInt(age, 0),
      });
      window.location.replace("/");
    }
  }

  onMount(() => {
    initStorage();
    items = getItems();
  });
</script>

<a href="/"> 🔙 </a>

<h3>Enter new element</h3>
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
<button on:click={handleAdd}>add</button>

<style>
  a {
    font-size: 2rem;
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
</style>

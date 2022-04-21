<script>
  //  import Header from '$lib/header/Header.svelte';
  import { page } from "$app/stores";
  import "../reset.css";
  import "../app.css";
</script>

<main>
  <h1>The canonical app</h1>
  <slot />
</main>

<footer />

<style>
  h1 {
    margin: 0;
    text-align: center;
  }
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 5rem 0 5rem;
  }

  .no-scroll {
    overflow: hidden;
  }
</style>

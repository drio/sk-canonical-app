<script>
  //  import Header from '$lib/header/Header.svelte';
  import { page } from "$app/stores";
  import "../reset.css";
  import "../app.css";
</script>

<main>
  <p>The canonical app 🎉</p>
  <slot />
</main>

<footer />

<style>
  p {
    margin: 10px 0 0 0;
    text-align: center;
    font-size: 1.2rem;
    color: grey;
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
    padding: 0 2rem 0 2rem;
  }
</style>

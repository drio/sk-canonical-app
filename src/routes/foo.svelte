<script lang="ts">
  import { getItems } from "$lib/foo.ts";
</script>

{#await getItems()}
  <p>Loading ...</p>
{:then data}
  <pre>data: {JSON.stringify(data.items, null, 2)}</pre>
{:catch error}
  <p>{error.message}</p>
{/await}

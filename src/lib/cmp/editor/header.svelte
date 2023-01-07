<script>
  import Text from "./text.svelte"
  export let elem;
  export let indexItem;
</script>

{#if elem.type == "h1"}
  <h1 >
    <Text bind:item={elem} indexItem={indexItem}/>
  </h1>
{/if}
{#if elem.type == "h2"}
  <h2>
    <Text bind:item={elem} indexItem={indexItem}/>
  </h2>
{/if}
{#if elem.type == "h3"}
  <h3 >
    <Text bind:item={elem} indexItem={indexItem}/>
  </h3>
{/if}
{#if elem.type == "h4"}
  <h4 >
    <Text bind:item={elem} indexItem={indexItem}/>
  </h4>
{/if}
{#if elem.type == "h5"}
  <h5 >
    <Text bind:item={elem} indexItem={indexItem}/>
  </h5>
{/if}


<style media="screen">
  h1,h2,h3,h4,h5{
    text-align: left;
  }
</style>

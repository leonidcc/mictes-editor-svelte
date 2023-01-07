<script>
  import Text from "./text.svelte"
  export let elem;
  export let indexItem;
</script>

<blockquote >
  <Text bind:item={elem} indexItem={indexItem}/>
</blockquote>

<style media="screen">
  blockquote{
    padding: 10px;
    margin: 0px;
    border-left: 2px solid green;
    background: rgba(0, 0, 0, 0.1);
  }
</style>

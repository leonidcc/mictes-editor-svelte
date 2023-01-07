<script>
  import Text from "./text.svelte"
  export let elem;
  export let indexItem;
</script>

<li >
  <Text bind:item={elem} indexItem={indexItem}/>
</li>

<style media="screen">
  blockquote{
    padding: 10px;
    margin: 0px;
    border-left: 2px solid green;
    background: rgba(0, 0, 0, 0.1);
  }
</style>

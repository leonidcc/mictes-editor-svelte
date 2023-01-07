<script>
  import Text from "./text.svelte"
  export let elem;
  export let indexItem;
</script>

<p >
  <Text bind:item={elem} indexItem={indexItem}/>
</p>

<style media="screen">
  p{
    margin: 0px;
  }
</style>

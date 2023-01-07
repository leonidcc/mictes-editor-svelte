<script type="text/javascript">
import Text from "./text.svelte"
  export let elem;
  export let indexItem;
</script>


<div class="d-flex" contenteditable="false" style="padding:5px 0px 0px 0px">
  <img width="40px" src="https://www.iconpacks.net/icons/2/free-pdf-download-icon-2617-thumb.png" alt="">
  <div class="">
    <div
      class="strong"
      id={indexItem+"-0"} 
      contenteditable="true"
      bind:innerHTML={elem.data[0].content}>
        <!-- <Text bind:elem={elem} indexItem={indexItem}/> -->
    </div>
    <span>lorem set data 100k</span>
  </div>
</div>

<style media="screen">
.d-flex{
  justify-content: start;
  align-items: start;
  display: flex;
}
.strong{
  font-weight: 700;
}
</style>

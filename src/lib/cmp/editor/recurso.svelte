<script type="text/javascript">
import Text from "./text.svelte"
  export let elem;
  export let indexItem;
</script>


<div contenteditable="false" >
  <iframe contenteditable="false" width="100%" height="315" src="https://www.youtube.com/embed/8WdprhzmQe4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
  </iframe>
    <small >
      <div>
      {elem.data[0].content}
    </div>
  </small>
</div>

<style media="screen">
  small{
    text-align: right;
    color: gray;
    font-style: oblique;
  }
</style>

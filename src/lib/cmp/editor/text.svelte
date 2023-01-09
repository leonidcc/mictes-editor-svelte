<script>
  import caret from "./lib/caret.js"
  import markdown from "./lib/markdown.js"
  import {
    invoke_user,
    set_markdow_inline,
    insert_new_elem
  } from "./lib/oneChar.js"

  export let item;
  export let indexItem;

  // los eventos hacen referencia a los elementos, del item actual
  function onKeyDownElemento(e) {
    let [i,j] = e.target.getAttribute("id").split("-").map(e=>parseInt(e));
    let content = item.data[j].content;
    let [x,xs] = caret.splitByCaret(content);

    // Intento espacio en un elemnto usuario
    if(e.keyCode == 32 && item.data[j].type == "user"){
      e.preventDefault();
      if(item.data[j+1] == undefined) item.data.push({class:"",content:"&nbsp;"})
      item.data[j+1].content = "&nbsp;"+item.data[j+1].content;
      caret.focus(i,j+1,1);
    }

    // intento escribir @ dentro de un tipo user
    if (e.keyCode == 50 && item.data[j].type == "user") { // @
      e.preventDefault();
    }

    // suprimo caracter
    if (e.keyCode == 46 ) {
      if(xs=="" && j < item.data.length-1){
        e.preventDefault()
        item.data[j+1].content = item.data[j+1].content.replaceAll("&nbsp;"," ").slice(1);
        // Limpiamos todos los elementos con contedido vacio
        item.data = item.data.filter(e=>e.content.trim() !="");
      }
    }

  }


  function onKeyUpElemento(e) {
    let [i,j] = e.target.getAttribute("id").split("-").map(e=>parseInt(e));
    let content = item.data[j].content;
    let [x,xs] = caret.splitByCaret(content);

    // Cambio de estilo del item i
    if(e.keyCode == 32 && j == 0){
      let [change, newItem] = markdown(item);
      if(change) caret.focus(i);
      item = newItem;
    }

    // añado un elemnto tipo usuario
    if (e.keyCode == 50) { // @
      let [change, newItem] = invoke_user(item,j);
      if(change) caret.focus(i,j+1,1);
      item = newItem;
    }

    // añado un elemnto
    if (e.keyCode == 219) {
      item = insert_new_elem(item,j,(s)=>{
        caret.focus(i,j+s,1);
      });
    }

    // markdown en linea
    if (e.keyCode == 32) {
      item = set_markdow_inline(item, j,()=>{
        caret.focus(i,j+2,1);
      });
    }

    // borro caracter
    if (e.keyCode == 8 ) {
      if(x=="" && j>0){
          caret.focus(i,j-1,"end");
          // Limpiamos todos los elementos con contedido vacio
      }
      item.data = item.data.filter(e=>e.content.trim() !="");
    }




  }




</script>



{#each item.data as e, key}
        {#if e.type == "link"}
          <a href={e.href} contenteditable="false" target="blank">
            <span
            id={indexItem+"-"+key}
            class={e.class}
            contenteditable="true"
            bind:innerHTML={e.content}
            on:keydown={onKeyDownElemento}
            on:keyup={onKeyUpElemento}
            data-info={JSON.stringify(e)}
            ></span>
          </a>
        {:else}
          <span
          id={indexItem+"-"+key}
          class={e.class}
          contenteditable="true"
          bind:innerHTML={e.content}
          on:keydown={onKeyDownElemento}
          on:keyup={onKeyUpElemento}
          data-info={JSON.stringify(e)}
          ></span>
        {/if}
{/each}

<style media="screen">


  /* DEBUG */
  /* span{
    border: 1px solid rgba(255, 0, 0, 0.15);
  } */

  /* STYLE DEFAULT */
  .link{
    color: green;
  }
  .user{
    color: blue;
  }
  .strong{
    font-weight: bold;
  }
  .code{
    font-family: monospace;
    background: pink;
    padding: 0px 3px;
    border-radius:3px;
  }
  .em{
    font-style: oblique;
  }
</style>

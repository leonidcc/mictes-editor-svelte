<script>
import caret from "./lib/caret.js"
import File from "./file.svelte"
import Recurso from "./recurso.svelte"
import Paragraph from "./paragraph.svelte"
import Blockquote from "./blockquote.svelte"
import Li from "./li.svelte"
import HeaderText from "./header.svelte"

export let mictes = [];

if (mictes.length == 0) {
	mictes = [
			{
				"type":"p",
				"data":[
					{
						"class":"",
						"content":"Esta historia comienza..."
					}
				]
			}]
}


	function isvacio(i) {
		return i.data.length == 1 && ([" ","","&nbsp;"].includes(i.data[0].content))
	}

	function newLine(e) {
		let [i,j] = e.target.getAttribute("id").split("-").map(e=>parseInt(e));
		let content = mictes[i].data[j].content;
		content = content.replaceAll("&gt;",">");
		content = content.replaceAll("&nbsp;"," ");
		let [x,xs] = caret.splitByCaret(content);
		e.preventDefault();

		if(["user"].includes(mictes[i].data[j].type)) return;

		// enter al principio de todo con el caret a la izq sin nada
		if(j==0 && x=="" && content != "" && content != " "){
				let mictest = [...mictes];
				mictest.splice(i,0,{
					"type":"p","data":[{"class":"","content":"&nbsp;"}]})
				mictes = mictest;
				caret.focus(++i);
				return;
		}

		//un solo elemento y ademas este es " "
		if (mictes[i].data.length==1 && content == " ") {
				if(mictes[i].type != "p"){
					mictes[i].type="p";
					caret.focus(i);
				}else {
					let mictest = [...mictes];
					mictest.splice(i,0,{
						"type":"p","data":[{"class":"","content":"&nbsp;"}]})
					mictes = mictest;
					caret.focus(++i);
				}
			return;
		}

		// enter al final de todo
		if (j==mictes[i].data.length-1 && (xs == "" || xs == " ")) {
			let mictest = [...mictes];
			let ntype = ["file","h1","h2","h3","h4","h5","h6"].includes(mictes[i].type)?"p":mictes[i].type;
			mictest.splice(++i,0,{
				"type": ntype,"data":[{"class":"","content":"&nbsp;"}]})
			mictes = mictest;
			caret.focus(i);
			return;
		}
		if(["file"].includes(mictes[i].type)){
			let mictest = [...mictes];
			mictest[i].data[j].content=x;
			mictest.splice(++i,0,{
				"type": "p","data":[{"class":"","content":xs}]})
			mictes = mictest;
			caret.focus(i);
			return;
		}
		// enter en otro caso
		let tdata = [...mictes[i].data];
		let [l,r] = [tdata.splice(0, j), tdata];
		r[0].content = xs;
		let mictest = [...mictes];
		mictes[i].data = l;
		mictes[i].data.push({...r[0],content:x})
		mictest.splice(++i,0,{
			"type": mictes[i-1].type,
			"data":r
		})
		mictes = mictest;
		caret.focus(i);
		// se limpian elemntos nulos
		mictes[i-1].data = mictes[i-1].data.filter(e=>e.content.trim() !="");
		mictes[i].data = mictes[i].data.filter(e=>e.content.trim() !="");
		return;
	}
	function clear(e) {
		let [i,j] = e.target.getAttribute("id").split("-").map(e=>parseInt(e));
		let content = mictes[i].data[j].content;
		content = content.replaceAll("&gt;",">");
		content = content.replaceAll("&nbsp;"," ");
		let [x,xs] = caret.splitByCaret(content);


		// borramos estando al principio de todo y el de arriba no es vacio
		if(i>0 && j==0 && x == "" && !isvacio(mictes[i-1])){

			// En caso de ser file solo movemos el cursor y no unimos nada
			if(mictes[i].type == "file" || mictes[i-1].type == "file"){
				j = mictes[i-1].data.length-1;
				caret.focus(i-1,j,"end");
				return;
			}
			// para arriba
			j = mictes[i-1].data.length-1;
			mictes[i-1].data = mictes[i-1].data.concat(mictes[i].data);
			mictes.splice(i,1);
			caret.focus(i-1,j,"end")
			return;
		}

		// borramos y el de arriba es vacio
		if(i>0 && j==0 && x == "" && isvacio(mictes[i-1]) ){
			// para arriba
			let mictest= [...mictes];
			mictest.splice(i-1,1);
			mictes = mictest
			caret.focus(i-1);
			return;
		}

		// borramos el ultimo caracter y no hay nada mas en el editor
		if(i==0 && j==0 && mictes[i].data.length==1 && content.length==1 && x.length==1) {
			console.log("borramos el ultimo");
			let mictest= [...mictes];
			mictest.splice(i,1);
			if (mictest.length == 0) {
				mictest = [
						{
							"type":"p",
							"data":[
								{
									"class":"",
									"content":"&nbsp;"
								}
							]
						}]
			}
			mictes = mictest
			caret.focus(0,j,"end");
			return;
		}

		// Si solo queda un caracteer a remover
		if (i>0 && mictes[i].data.length==1 && content.length==1 && x.length==1) {
			e.preventDefault();
			j = mictes[i-1].data.length-1;
			let mictest= [...mictes];
			mictest.splice(i,1);
			mictes = mictest
			caret.focus(i-1,j,"end");
			return;
		}



	}
	function supr(e) {
		let [i,j] = e.target.getAttribute("id").split("-").map(e=>parseInt(e));
    let [x,xs] = caret.splitByCaret(mictes[i].data[j].content);
		let content = mictes[i].data[j].content;
		content = content.replaceAll("&gt;",">");
		content = content.replaceAll("&nbsp;"," ");

		if(content.length == 1 && mictes[i].data[j+1]!= undefined && !isvacio(mictes[i]) ){
			caret.focus(i,j);
			return;
		}
		if(i < mictes.length-1 && j == mictes[i].data.length -1 && xs == "" && !isvacio(mictes[i]) ){
			console.log("Estamos a lo ultimo");
			if(mictes[i+1].type != "file"){
				// para arriba
				mictes[i].data = mictes[i].data.concat(mictes[i+1].data);
				mictes.splice(i+1,1);
				// caret.focus(i,j,"end")
				return;
			}

		}
	}

	function onKeyDownItem(e) {
	  if (e.keyCode === 13) newLine(e);
	  if (e.keyCode === 8 ) clear(e);
	  if (e.keyCode === 46) supr(e);
	}

	function onKeyUpItem(e) {
		let [i,j] = e.target.getAttribute("id").split("-").map(e=>parseInt(e));
		let [x,xs] = caret.splitByCaret(mictes[i].data[j].content);
		let content = mictes[i].data[j].content;
		content = content.replaceAll("&gt;",">");
		content = content.replaceAll("&nbsp;"," ");

		if (e.keyCode === 46){
			mictes[i].data = mictes[i].data.filter(e=>e.content.trim() !="");

			if(mictes[i].data.length == 0 ){
					if(i>1&& i==mictes.length-1){
						console.log(mictes);
						mictes.pop();
						caret.focus(i-1);
					}else if (i>1&& i<mictes.length-1) {
						let mictest= [...mictes];
						mictest.splice(i,1);
						mictes = mictest
						caret.focus(i);
					}
			}
		}
		if ( mictes.length == 1 && mictes[0].data.length == 0) {
			mictes[0].data.push({"class":"","content":"&nbsp;"});
			mictes=mictes;
			caret.focus(0,0);
		}
		if (mictes.length == 1 && mictes[0].data.length == 1 && mictes[0].data[0].content=="") {
			mictes[0].data[0].content="&nbsp;";
			mictes=mictes;
			caret.focus(0,0);
		}



	}














	let boolean = false;
	// Permite poder desplazar el cursor por todo el editor
	function onKeyDown(e){
	   if(e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 35 || e.keyCode == 36){
	     boolean = true;
	     setTimeout(()=>{
	       boolean = false;
	       setTimeout(()=>{
	         let nextnode = window.getSelection().focusNode.parentNode;
	         nextnode.focus();

	      },0)
			},0)
	   }
	}




let indexig;
let indexjg;

let itemFocus;
	function onkeyUpFocus(e) {
		console.log(JSON.stringify(mictes));
		try {
			let [i,j] = e.target.getAttribute("id").split("-").map(e=>parseInt(e));
			itemFocus = mictes[i].data[j];
			indexig = i;
			indexjg = j;
			if(itemFocus.type=="new"){
				setTimeout(()=>{
					document.getElementById("newitem").focus();
				},0)
			}
		} catch (e) {
			console.log("capturado",e);
		}
	}

let users = [
	"leonid","juan","leonela","mateo","martin","marcos","marta"
]


</script>


<div id="helpBox">
	{#if itemFocus}
		{#if itemFocus.type == "user"}
		<select class="form-select" multiple on:change={(e)=>{
			itemFocus.content = "@"+e.target.value;
			mictes=mictes;
			itemFocus = null;

			let elem = mictes[indexig];

			if(elem.data[indexjg+1]){
				elem.data[indexjg+1].content = "&nbsp;"+elem.data[indexjg+1].content;
			}else {
				elem.data.push({class:"",content:"&nbsp;"})
			}
			caret.focus(indexig,indexjg+1,1);

		}} >
				{#each
					users.filter(e=>("@"+e+" ").includes(itemFocus.content.replaceAll("&nbsp;","")))
				as user}
					<option value={user}>{user}</option>
				{/each}
		</select>
		{/if}


		{#if itemFocus.type == "new"}
			 <select id="newitem" name="" multiple on:keydown={(e)=>{
				 if(e.keyCode == 13){
					 itemFocus.class = e.target.value;
					 itemFocus.type=""
					 if(e.target.value=="link"){
						 itemFocus.href = prompt("Ingrese url");
						 itemFocus.type="link";
					 }
					 mictes=mictes;
					 caret.focus(indexig,indexjg);
					 itemFocus = null;
				 }

	 		}}>
				 <option selected value="nothig"> nothing </option>
				 <option value="strong"> **strong** </option>
				 <option value="em"> _oclicuq_ </option>
				 <option value="code"> `code` </option>
				 <option value="link"> [Link] </option>
			 </select>
		{/if}

	{/if}
</div>


<div  contenteditable={boolean} class="editor" on:keydown={onKeyDown} on:keyup={onkeyUpFocus}>
	{#each  mictes  as elem, indexItem}
		<div class="item" on:keydown={onKeyDownItem} on:keyup={onKeyUpItem}>
			{#if elem.type == "p" }
				<Paragraph bind:elem={elem} indexItem={indexItem} />
			{/if}
			{#if elem.type == "file" }
				<File bind:elem={elem} indexItem={indexItem} />
			{/if}
			{#if elem.type == "blockquote" }
				<Blockquote bind:elem={elem} indexItem={indexItem} />
			{/if}
			{#if elem.type == "li" }
				<Li bind:elem={elem} indexItem={indexItem} />
			{/if}
			{#if elem.type == "recurso" }
				<Recurso bind:elem={elem} indexItem={indexItem} />
			{/if}
			{#if ["h1","h2","h3","h4","h5","h6"].includes(elem.type) }
				<HeaderText bind:elem={elem} indexItem={indexItem}/>
			{/if}
		</div>
	{/each}

</div>


<!-- {JSON.stringify(mictes)} -->

<style media="screen">
	#helpBox{
		background: white;
		border: 1px solid gray;
		position: fixed;
		right: 0px;
		top: 20vh;
		max-width: 200px;
		padding: 5px;
	}

	h1{
		text-align: left;
		margin: 0px;
		padding: 20px 0px;
	}

	.item{
		padding: 0px 20px;
	}
	.item:hover{
		outline: 1px dashed rgba(63,181,232,0.5);
		outline-offset: 1px;
	}
</style>

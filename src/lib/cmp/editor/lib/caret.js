class CaretInterfaz {
  constructor() {

  }
  getPositionCaret(){
	  return window.getSelection().focusOffset
	}
  splitByCaret(text) {
    text = text.replaceAll("&nbsp;"," ");
    let caretIndex = this.getPositionCaret();
    return [
      text.slice(0,caretIndex),
      text.slice(caretIndex)
    ];
	}
  caretSet(pos){
    let textNode = document.getSelection().baseNode;
    setTimeout(()=>{
		let caret = pos; // insert caret after the 10th character say
		let range = document.createRange();
		range.setStart(textNode, caret);
		range.setEnd(textNode, caret);
		let sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
    },0)
	}
  focusId(id){
    setTimeout(()=>{
      let newf = document.getElementById(id);
      if(newf) newf.focus()
    },0)
  }

  focus(i=0,j=0,k=0) {
		setTimeout(()=>{
			let newf = document.getElementById(`${i}-${j}`); 
			if(newf){
        newf.focus();
        if(k=="end"){
          let tnode = document.getSelection().baseNode;
          k=tnode.length;
        }
        this.caretSet(k);
      }
		},0)
	}
}
let caret = new CaretInterfaz();
export default caret;



export function invoke_user(item,j){

  let content = item.data[j].content;
  content = content.replaceAll("&gt;",">");
  content = content.replaceAll("&nbsp;"," ");

  let textMatch = content.match(/\@/g);
  if(textMatch && item.data[j].type != "user"){
    let [x,xss] = content.split(textMatch[0]);
    let [l,m,r] = [
      {...item.data[j], content:x==""?"&nbsp;":x},
      {...item.data[j], content:"@", type:"user"},
      {...item.data[j], content:xss==""?"&nbsp;":xss}
    ];
    m.class +=" user";
    const newdata = [...item.data];
    newdata.splice(j,1,l,m,r);
    item.data = newdata;
    return [true,item]
  }
  return [false,item];
};



export function insert_new_elem(item,j,f){

  let content = item.data[j].content;
  content = content.replaceAll("&gt;",">");
  content = content.replaceAll("&nbsp;"," ");

  let textMatch = content.match(/\\/g);
  if(textMatch && item.data[j].type != "user"){
    let [x,xss] = content.split(textMatch[0]);
    console.log([x,xss]);
    let [l,m,r] = [
      {...item.data[j], content:(x=="" || x==" ")?"&nbsp;":x},
      {...item.data[j], content:"&nbsp;", type:"new"},
      {...item.data[j], content:(xss=="" || xss==" ")?"&nbsp;"+xss:xss},
    ];
    m.class +=" new";
    const newdata = [...item.data];
    if(l.content != ""){
      newdata.splice(j,1,l,m,r);
      f(1);
    }else {
      newdata.splice(j,1,m,r);
      f(0);
    }
    item.data = newdata;
  }
  return item;
};



export function set_markdow_inline(item,j, f){
    item = set(item,j, /\*\*+.+\*\* /g,"*"," strong",f);
    item = set(item,j,/\_+.+\_ /g,"_"," em",f);
    item = set(item,j, /\`+.+\` /g,"`"," code",f);
    return item;
};

function set(item,j,regexp,char,classes,f) {

  let content = item.data[j].content;
  content = content.replaceAll("&gt;",">");
  content = content.replaceAll("&nbsp;"," ");

  let textMatch = content.match(regexp)
  if(textMatch){
    let [x,xss] = content.split(textMatch[0]);
    let xs = textMatch[0].replaceAll(char,"")

    let [l,m,r] = [
      {...item.data[j],content:x==""?"&nbsp;":x},
      {...item.data[j], content:xs.slice(0, -1)},
      {...item.data[j], content:"&nbsp;"+xss}
    ];
    m.class+=classes;
    const newdata = [...item.data];
    newdata.splice(j,1,l,m,r);
    item.data = newdata;
    f();
  }
  return item;
}

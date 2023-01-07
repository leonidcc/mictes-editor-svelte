export default function markdown(item) {
  let text = item.data[0].content;
  text = text.replaceAll("&gt;",">");
  text = text.replaceAll("&nbsp;"," ");
  let change = false;
  console.log(text);

  if(/^\> ./.test(text) && text){
    item.type = "blockquote"
    item.data[0].content = text.slice(1);
    change=true;
  }
  else if(/^##### ./.test(text) && text){
    item.type = "h5"
    item.data[0].content = text.slice(5);
    change=true;
  }
  else if(/^#### ./.test(text) && text){
    item.type = "h4"
    item.data[0].content = text.slice(4);
    change=true;
  }
  else if(/^### ./.test(text) && text){
    item.type = "h3"
    item.data[0].content = text.slice(3);
    change=true;
  }
  else if(/^## ./.test(text) && text){
    item.type = "h2"
    item.data[0].content = text.slice(2);
    change=true;
  }
  else if(/^# ./.test(text) && text){
    item.type = "h1"
    item.data[0].content = text.slice(1);
    change=true;
  }
  else if(/^\* ./.test(text) && text){
    item.type = "li"
    item.data[0].content = text.slice(1);
    change=true;
  }
  if( item.data[0].content == "  ") item.data[0].content = "&nbsp;"
  return [change,item];
};

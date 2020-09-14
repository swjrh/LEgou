<script>


window.onload = function(){
  var oUl = document.getElementById("ul");
  var aLi = oUl.getElementsByTagName("li");

/*
这里要用到事件源：event 对象，事件源，不管在哪个事件中，只要你操作的那个元素就是事件源。
ie：window.event.srcElement
标准下:event.target
nodeName:找到元素的标签名
*/
  oUl.onmouseover = function(ev){
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    //alert(target.innerHTML);
    if(target.nodeName.toLowerCase() == "li"){
    target.style.background = "red";
    }
  }
  oUl.onmouseout = function(ev){
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    //alert(target.innerHTML);
    if(target.nodeName.toLowerCase() == "li"){
    target.style.background = "";
    }
  }
}

</script>
// let timeout = null;
// function debounce(fn, wait) {
//  if (timeout !== null) clearTimeout(timeout);
//  timeout = setTimeout(fn, wait);
// }
// export default debounce;


// 函数防抖
export function debounce(fn,delay) {
    // 记录上一次的延时器
    var timer = null;
    var delay = delay || 300;
    return function() {
      var args = arguments;//保存函数参数
      var context = this;//保存this上下文
    //   console.log(args)
    //   console.log(context.value)
      // 清除上一次延时器
      clearTimeout(timer)
      timer = setTimeout(function() {
          fn.apply(context,args)
      }, delay);
   }
}




  //函数节流
export function throttle(fn,interval){
    let last = 0;  //记录上一次事件调用的时间
    return function(){
      let context = this;
      let args = arguments;
      let tim = +new Date();
      if((tim-last)>interval){//如果当前时间减去上一次执行的时间大于规定的时间
        last = tim
        fn.apply(context,args)
      }
    }
  }



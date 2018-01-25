/**
 * Created by Administrator on 2017/4/14.
 */

//，exit方法会在当进程退出的时候执行。因为进程退出之后将不再执行事件循环，所有只有那些没有回调函数的代码才会被执行
process.on("exit",function(code){
    setTimeout(function(){
        console.log("该代码不会执行")
    },0)

    console.log("退出码为%s",code)
})

console.log("程序执行结束")
console.log(process.platform);
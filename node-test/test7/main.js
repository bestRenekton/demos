/**
 * Created by Administrator on 2017/4/14.
 */
var fs=require("fs");
// 异步读取
console.log("准备打开文件")
fs.stat("input.txt",function(err,data){
    if(err){
        return console.error(err)
    }else{
        console.log(data)
    }
})

/**
 * Created by Administrator on 2017/4/11.
 */
var fs=require("fs");
var data="";
//创建可读流
var readerStream=fs.createReadStream("input.txt");
//设置编码
readerStream.setEncoding("UTF-8");
// 处理流事件 --> data, end, and error
readerStream.on("data",function(chunk){
    data+=chunk+"123";
})

readerStream.on("end",function(){
    console.log(data+"abc");
})

readerStream.on("error",function(err){
    console.log(err.stack)
})

console.log("-over-")
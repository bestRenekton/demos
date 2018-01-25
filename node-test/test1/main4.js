/**
 * Created by Administrator on 2017/4/11.
 */
var events=require("events");
var eventEmitter=new events.EventEmitter();

//j1
var listener1=function listener1(){
    console.log("监听器 listener1 执行")
}
//j2
var listener2=function listener2(){
    console.log("监听器 listener2 执行")
}
//绑定
eventEmitter.addListener("connection",listener1);
eventEmitter.on("connection",listener2);

var eventListeners=require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners+"个监听器监听连接事件。")
//触发 connection 事件
eventEmitter.emit("connection");
//删除绑定
eventEmitter.removeListener("connection",listener1);
console.log("listener1 不再受监听")

//触发 connection 事件
eventEmitter.emit("connection");

eventListeners=require("events").EventEmitter.listenerCount(eventEmitter,"connection");
console.log(eventListeners+"个监听器监听连接事件。")

console.log("-over-")
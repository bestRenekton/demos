/**
 * Created by Administrator on 2017/4/11.
 */
var events=require("events");
var eventEmitter=new events.EventEmitter();

eventEmitter.on("some_event",function(){
    console.log("asdf");
});

setTimeout(function(){
    eventEmitter.emit("some_event")
},1000);
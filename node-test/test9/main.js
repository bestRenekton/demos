/**
 * Created by Administrator on 2017/4/18.
 */
var net=require("net");

var server=net.createServer(function(connection){
    console.log("client connected");
    connection.on("end",function(){
        console.log("客户端关闭")
    });
    connection.write('Hello World!\r\n');
    connection.pipe(connection);
})

server.listen(8080,function(){
    console.log('server is listening')
})
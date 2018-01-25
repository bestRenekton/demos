/**
 * Created by Administrator on 2017/4/20.
 */
var express=require("express");
var app=express();
var fs=require("fs");
//查询----------
app.get("/listUsers",function(req,res){
    fs.readFile(__dirname+"/"+"users.json","utf8",function(err,data){
        console.log(data);
        res.end(data);
    })
});
//添加-------------
var user={
    "user4":{
        "name":"ddd",
        "password":"password4",
        "profession":"librarian",
        "id":4
    }
};
app.get("/addUsers",function(req,res){
    fs.readFile(__dirname+"/"+"users.json","utf8",function(err,data){
        var data=JSON.parse(data);
        data["user4"]=user["user4"];
        console.log(data);
        res.end(JSON.stringify(data));
    })
});
//删除用户---------
var id=2;
app.get("/deleteUser",function(req,res){
    fs.readFile(__dirname+"/"+"users.json","utf8",function(err,data){
        data=JSON.parse(data);
        delete data["user"+id]
        console.log(data);
        res.end(JSON.stringify(data));
    })
});
//显示用户详情---------
app.get("/:id",function(req,res){
    fs.readFile(__dirname+"/"+"users.json","utf8",function(err,data){
        var data=JSON.parse(data);
        var user=data["user"+req.params.id];
        console.log(user);
        res.end(JSON.stringify(user));
    })
});



var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
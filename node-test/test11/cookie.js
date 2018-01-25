/**
 * Created by Administrator on 2017/4/20.
 */
var express=require("express");
var cookieParser=require("cookie-parser");
var app=express();

app.use(cookieParser())
app.get("/",function(req,res){
    console.log("cookie:",req.cookies)
})
app.listen(8081)
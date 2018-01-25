/**
 * Created by Administrator on 2017/4/20.
 */
var express=require("express");
var app=express();
var fs=require("fs");
var bodyParser=require("body-parser");
var multer=require("multer");

app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({dest:"/tmp/"}).array("image"));

app.get("/index_up.html",function(req,res){
    res.sendFile(__dirname+"/"+"index_up.html");
})

app.post("/file_upload",function(req,res){
    // 上传的文件信息
    console.log(req.files[0]);

    var des_file=__dirname+"/upload/"+req.files[0].originalname;
    fs.readFile(req.files[0].path,function(err,data){
        fs.writeFile(des_file,data,function(err){
            if(err){
                console.log(err);
            }else{
                response={
                    message:"File uploaded successfully",
                    filename:req.files[0].originalname
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        })
    })
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
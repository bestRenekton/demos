/**
 * Created by Administrator on 2017/4/12.
 */
var fs=require("fs");
var zlib=require("zlib");
var readerStream=fs.createReadStream("output3.txt.zip");
var writerStream=fs.createWriteStream("output4.txt");
var gunziperStream=zlib.createGunzip();

//读取-解压-写入
readerStream.pipe(gunziperStream).pipe(writerStream)
console.log("文件解压完成")
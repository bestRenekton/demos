/**
 * Created by Administrator on 2017/4/12.
 */
var fs=require("fs");
var zlib=require("zlib");
var readerStream=fs.createReadStream("input.txt");
//压缩格式后缀必须设置
var writerStream=fs.createWriteStream("output3.txt.zip")
var ziperStream=zlib.createGzip();


//读取-压缩-写入
readerStream.pipe(ziperStream).pipe(writerStream)
console.log("文件压缩完成")



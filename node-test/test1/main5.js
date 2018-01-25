/**
 * Created by Administrator on 2017/4/11.
 */
var buf=new Buffer(256),
    len=buf.write("www.baidu.com");
console.log("写入字节数："+len);

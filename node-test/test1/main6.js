/**
 * Created by Administrator on 2017/4/11.
 */
var buf=new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
    buf[i] = i + 97;
}
console.log(buf.toString('ascii'))
console.log(buf.toString('ascii',0,5))
console.log(buf.toString('utf8',0,5))
console.log(buf.toString(undefined,0,5))


var buf1=new Buffer('www.baidu.com');
var json=buf1.toJSON();

console.log(json)
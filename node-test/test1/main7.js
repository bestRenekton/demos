/**
 * Created by Administrator on 2017/4/11.
 */
var buffer1=new Buffer('ABC');
var buffer2=new Buffer('ABCD');
var result=buffer1.compare(buffer2);

if(result<0){
    console.log(buffer1+"在"+buffer2+"之前")
}else if(result==0){
    console.log(buffer1+"和"+buffer2+"相同")
}else if(result>0){
    console.log(buffer1+"在"+buffer2+"之后")
}


var buffer3=new Buffer(3);
buffer1.copy(buffer3);
console.log("buffer3 content:"+buffer3.toString())

var buffer4=buffer1.slice(0,2);
console.log("buffer4 content:"+buffer4.toString())
console.log("buffer1 content:"+buffer1.toString())
console.log("buffer1 length:"+buffer1.length)
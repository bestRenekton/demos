/**
 * Created by Administrator on 2017/4/14.
 */
var util=require("util");

function Base(){
    this.name="base";
    this.base=1991;
    this.sayHello=function(){
        console.log("hello"+this.name)
    }
}
Base.prototype.showName= function () {
    console.log(this.name)
}
function Sub(){
    this.name="sub";
}

util.inherits(Sub,Base);
var objBase=new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);


//Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承
var objSub=new Sub();
objSub.showName();
//objSub.sayHello();
console.log(objSub);
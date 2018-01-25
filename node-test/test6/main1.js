/**
 * Created by Administrator on 2017/4/14.
 */
var util=require("util");
function Person(){
    this.name="byvoid";
    this.toString=function(){
        return this.name;
    }
}
var obj=new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj,true));
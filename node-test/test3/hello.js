/**
 * Created by Administrator on 2017/4/13.
 */

//通过 exports 对象把 sayHello 作为模块的访问接口
function sayHello(){
    console.log("hello")
}

module.exports=sayHello;
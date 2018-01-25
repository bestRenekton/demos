<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/3
 * Time: 14:13
 */


//设置编码
//header("Content-Type:text/plain;charset=utf-8");
header("Content-Type:application/json;charset=utf-8");
//header("Content-Type:text/xml;charset=utf-8");
//header("Content-Type:text/html;charset=utf-8");
//header("Content-Type:application/javascript;charset=utf-8");

//定义多维数组，每条员工信息为一个数组
$staff = array(
    array("name"=>"洪七公","number"=>"101","sex"=>"男","job"=>"总经理"),
    array("name"=>"洪七公2","number"=>"102","sex"=>"男","job"=>"总经理2"),
    array("name"=>"洪七公3","number"=>"103","sex"=>"女","job"=>"总经理3")
);

//判断如果是get进行搜索，post进行新建
//$_SERVER是一个超全局变量，任何位置都可以使用，不用使用global关键字
//$_SERVER["REQUEST_METHOD"]返回访问页面使用的请求方法
if($_SERVER["REQUEST_METHOD"]=="GET"){
    search();
}elseif($_SERVER["REQUEST_METHOD"]=="POST"){
    create();
}

//搜索
//$_GET,$_POST为超全局变量，isset检测是否设置，empty检测是否为空
function search(){
    if(!isset($_GET["number"]) || empty($_GET["number"])){
        echo '{"success":false,"msg":"参数错误"}';
        return;
    }
    //全局变量需使用global关键字
    global $staff;
    $number = $_GET["number"];
    $result = '{"success":false,"msg":"没有找到员工."}';

    //遍历数组，寻找key值为number的员工是否存在，如果存在，返回修改结果；
    foreach($staff as $value){
        if($value["number"]==$number){
            $result = '{
                            "success":true,
                            "msg":"找到员工：员工编号：'.$value["number"].
                            ',姓名'.$value["name"].
                            ',性别'.$value["sex"].
                            ',职位'.$value["job"]. '"
                        }';
            break;
        }
    }
    echo $result;
}

//创建
function create(){
    if(!isset($_POST["name"]) || empty($_POST["name"])
        || !isset($_POST["number"]) || empty($_POST["number"])
        || !isset($_POST["sex"]) || empty($_POST["sex"])
        || !isset($_POST["job"]) || empty($_POST["job"])
    ){
        echo '{"success":false,"msg":"参数错误，员工信息填写不全"}';
        return;
    }
    //TODO:获取POST表单数据并保存到数据库
    echo '{"success":true,"msg":"员工'.$_POST["name"].'信息保存成功！'.'"}';
}
?>
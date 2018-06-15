function SetCookie(name, value) {
    document.cookie = name + "=" + escape(value) + ";path=/";
}
function GetCookie(objName) {
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);
    }
    return "";
}
function Guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
function ControlFormart(type) {
    var formart = null;
    switch (type) {
        case "none":
            break;
        case "Mobile":
            formart = /^1[3,4,5,8,7]\d{9}$/;
            break;
        case "IdCard":
            formart = /^\d{15}|\d{18}$","^\d{15}$|^\d{17}[\da-zA-z]$/;
            break;
        case "PostalCode":
            formart = /^[1-9][0-9]{5}$/;
            break;
        case "Email":
            formart = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            break;
        default:
            break;
    }
    return formart;
}
function GetChildCList(Component, list) {
    let l = list.filter(a => a.container == Component.Id);
    let t = this;
    l.map(function (a) {
        if (a.Data.IsContainer) {
            let i = [];
            i = i.concat(t.GetChildCList(a, list));
            l = l.concat(i);
        }
    })
    return l;
}
function getCList(container, list) {
    return list.filter(a => a.container == container);
}
function FormJson() {
    return {
        Type:'',
        TypeName:'',
        Text:'',//标题
        Desc:'',//描述
        DataLinkType:0,//数据连接类型
        DataLinkValue:'',//数据连接值
        DataLinkOptions:{},//数据连接选项
        FormartText:'none',//格式
        FormartValue:null,
        Required:true,//必填
        Visible:true,//可见
        Editable:true,//可编辑
    };
}
var Test = {
    Type: "",
    TypeName: "",
    Text: "",//标题
    Desc: "",//描述
    DefaultValue: "",//默认值
    FormartText: "none",//格式
    FormartValue: null,
    Required: true,//必填
    Visible: true,//可见
    Editable: true//可编辑
}
module.exports = {
    SetCookie: SetCookie,
    GetCookie: GetCookie,
    Guid: Guid,
    ControlFormart: ControlFormart,
    Test: Test,
    FormJson: FormJson,
    GetChildCList: GetChildCList,
    getCList: getCList
}
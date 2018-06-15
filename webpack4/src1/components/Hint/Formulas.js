//逻辑函数
function AND(...args) {
    let val = true;
    for (let arg of args) {
        if (val && !arg) {
            return false;
        }
    }
    return val;
}
function OR(...args) {
    let val = false;
    for (let arg of args) {
        if (val || arg) {
            return true;
        }
    }
    return val;
}
function TRUE() {
    return true;
}
function FALSE() {
    return false;
}

function IF(logical, trueVal, falseVal) {
    if (logical)
        return trueVal;
    else
        return falseVal;
}
function NOT(logical) {
    return !logical;
}
function XOR(logical1, ...logicals) {
    let val = 0;
    let v = logical1;
    for (let logical of logicals) {
        if (v == logical)
            val = 0;
        else
            val = 1;
        v = logical;
    }
    return val;
}
//文本函数
function CONCAT(...args) {
    let val = '';
    for (let arg of args) {

        val += arg;
    }
    return val;
}

function EXACT(text1, text2) {
    return text1 === text2;
}

function LEFT(text, num) {
    return text.substr(0, num);
}

function LEN(text) {
    return text.length;
}

function LOWER(text) {
    return text.toLocaleLowerCase();
}

function REPLACE(old, start, num, newText) {
    let array = [];
    for (let t of old) {
        array.push(t);
    }
    array.splice(start, num, newText);
    let val = '';
    for (let t of array) {
        val += t;
    }
    return val;
}

function REPEAT(text, num) {
    let val = '';
    for (let i = 0; i < num; i++) {
        val += text;
    }
    return val;
}
function SEARCH(text, key, start) {
    return text.indexOf(key, start);
}
function RIGHT(text, num) {
    return text.substr(text.length - 5);
}
function SUM(...args) {
    let val = 0;
    for (let arg of args) {
        val += arg;
    }
    return val;
}

function SPLIT(text, sep) {
    return text.split(sep);
}

function TRIM(text) {
    return text.trim();
}

function UPPER(text) {
    return text.toLocaleUpperCase();
}

function NUM(text) {
    let val = parseFloat(text);
    if (isNaN(val))
        return 0;
    else {
        val;
    }
}
function MID(text, start, len) {
    return text.substr(start - 1, len);
}

function TEXT(num) {
    return num.toString();
}
function FormulaVal(str) {
    if (str.trim().length > 0) {
        let val;
        eval('val=' + str);
        return val
    }
    else
        return '';
}

export default {
    formulaVal: FormulaVal,
    formulaList: [
        {
            groupName: '逻辑函数',
            groupList: [{
                name: '并且',
                func: 'AND',
                exp: 'AND(arg1,arg2,arg3...)',
                desc: '如果所有参数(arg1,arg2,arg3...)全为true，返回true，否则返回false'
            }, {
                name: '或者',
                func: 'OR',
                exp: 'OR(arg1,arg2,arg3...)',
                desc: '如果所有参数(arg1,arg2,arg3...)全为false，返回false，否则返回true'
            }, {
                name: '假',
                func: 'FALSE',
                exp: 'FALSE()',
                desc: '返回false'
            }, {
                name: '真',
                func: 'TRUE',
                exp: 'TRUE()',
                desc: '返回true'
            }, {
                name: '如果',
                func: 'IF',
                exp: 'IF(logical,trueVal,falseVal)',
                desc: '如果logical为true，返回trueVal，否则返回falseVal'
            }, {
                name: '取反',
                func: 'NOT',
                exp: 'NOT(logical)',
                desc: '如果logical为true，返回false，否则返回true'
            }]
        }, {
            groupName: '文本函数',
            groupList: [{
                name: '合并',
                func: 'CONCAT',
                exp: 'CONCAT(arg1,arg2,arg3...)',
                desc: '将所有参数(arg1,arg2,arg3...)合并为一个文本'
            }, {
                name: '比较',
                func: 'EXACT',
                exp: 'EXACT(arg1,arg2)',
                desc: '比较arg1是否与arg2完全相同，相同返回true，否则返回false'
            }, {
                name: '左截取',
                func: 'LEFT',
                exp: 'LEFT(str,len)',
                desc: '返回字符串str从左向右第1个字符开始，截取len长度的字符串'
            }, {
                name: '长度获取',
                func: 'LEN',
                exp: 'LEN(str)',
                desc: '返回字符串str的长度'
            }, {
                name: '小写化',
                func: 'LOWER',
                exp: 'LOWER(str)',
                desc: '将字符串str中大写字母全部转为小写返回'
            }, {
                name: '替换',
                func: 'REPLACE',
                exp: 'REPLACE(str,start,len,newStr)',
                desc: '将字符串str中从start位置开始，长度为len的字符串替换为newStr返回'
            }, {
                name: '重复',
                func: 'REPEAT',
                exp: 'REPEAT(str,times)',
                desc: '将字符串str重复times次返回'
            }, {
                name: '搜索',
                func: 'SEARCH',
                exp: 'SEARCH(str,key,)',
                desc: '返回搜索字符串str中第一个与字符串key完全相同的字符的起始位置'
            }, {
                name: '右截取',
                func: 'RIGHT',
                exp: 'RIGHT(str,len)',
                desc: '返回字符串str从右向左第1个字符开始，截取len长度的字符串'
            }, {
                name: '分组',
                func: 'SPLIT',
                exp: 'SPLIT(str,key)',
                desc: '将字符串str以key为分隔符，分割成字符串组返回'
            }, {
                name: '文本化',
                func: 'TEXT',
                exp: 'TEXT(val)',
                desc: '将数据val（如数字）转换为字符串返回'
            }, {
                name: '去空格',
                func: 'TRIM',
                exp: 'TRIM(str)',
                desc: '将字符串str去除首位空格" "返回'
            }, {
                name: '大写化',
                func: 'UPPER',
                exp: 'UPPER(str)',
                desc: '将字符串str中小写字母全部转为大写返回'
            }, {
                name: '数字化',
                func: 'NUM',
                exp: 'NUM(str)',
                desc: '将字符串str转换为数字返回，如果str为非数字，则返回0'
            }]
        }],
    formulaKeywords: ['AND', 'OR', 'TRUE', 'FALSE', 'IF', 'NOT', 'XOR', 'CONCAT',
        'EXACT', 'LEFT', 'LEN', 'LOWER', 'REPLACE', 'REPEAT', 'SEARCH', 'RIGHT', 'SUM',
        'SPLIT', 'TRIM', 'UPPPER', 'MID', 'TEXT']
};
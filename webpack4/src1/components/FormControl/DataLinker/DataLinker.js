import { formulaVal, formulaKeywords } from '../../Hint/Formulas';
const LINKTYPE = Object.freeze({
    Custom: 0,
    Linker: 1,
    Formula: 2,
    Resource: 3
});
/*
DataLinkOptions
formula
{
    relations:[formitemId....]
}
*/
function initDataLinker(itemList) {
    let formItems = itemList.filter(a => a.Data.DataLinkType != LINKTYPE.Custom);
    let relationList = {};
    formItems.map(function (item, index) {
        switch (item.Data.DataLinkType) {
            case LINKTYPE.Formula:
                item.Data.DataLinkOptions.relations.map(function (l, i) {
                    if (!(relationList[l] instanceof Array)) {
                        relationList[l] = [];
                    }
                    relationList[l].push(item.Id);
                });
                break;
            case LINKTYPE.Resource:
                break;
            case LINKTYPE.Custom:
                break;
        }
    });
    return relationList;
}
function initBaseFormData(itemList, relations) {
    itemList.map(function (e) {
        e.isPreview = true;
    });
    let changeList = itemList.filter(a => a.Data.DataLinkType != LINKTYPE.Custom);
    changeList.map(function (item, index) {
        if (item.itemValue == undefined) {
            switch (item.Data.DataLinkType) {
                case LINKTYPE.Formula:
                    item.itemValue = getFormulaValue(item.Data.DataLinkValue, item.Data.DataLinkOptions.relations, itemList);
                    break;
                case LINKTYPE.Resource:
                    break;
                case LINKTYPE.Custom:
                    break;
            }
        }
    });
    return itemList;
}
function isEmptyString(str) {
    if (str instanceof String) {
        return str.trim() == '';
    }
    else
        return true;
}

function getVal(itemValue, DataLinkValue) {
    if (itemValue == 0)
        itemValue = '0';
    if (DataLinkValue == 0)
        DataLinkValue = '0';
    let val = itemValue || '';
    if (val != '') {
        return val;
    }
    else {
        val = DataLinkValue || '';
        if (val != '') {
            return val;
        }
        return '';
    }
}

function getDataLinkValue(t, parser) {
    if (t.isPreview) {
        let v = t.DataLinkValue == undefined ? t.Data.DataLinkValue : t.DataLinkValue;
        let type = t.DataLinkType == undefined ? t.Data.DataLinkType : t.DataLinkType;
        let val = getVal(t.itemValue, v);
        switch (type) {
            case LINKTYPE.Custom:
                return parser ?
                    (val == '' ? val : parser(val)) : val;
            case LINKTYPE.Formula:
            case LINKTYPE.Linker:
            case LINKTYPE.Resource:
                return parser ?
                    (t.itemValue == undefined ? '' : (isEmptyString(t.itemValue) ? '' : parser(t.itemValue))) :
                    (t.itemValue == undefined ? '' : t.itemValue);
        }
    }
    else {
        switch (t.DataLinkType) {
            case LINKTYPE.Custom:
                return parser ?
                    (parser(t.DataLinkValue) || '') :
                    (t.DataLinkValue || '');
            case LINKTYPE.Linker:
                return '数据联动';
            case LINKTYPE.Formula:
                return '公式计算';
            case LINKTYPE.Resource:
                return '资源取数';
        }
    }
}
function getFormulaValue(formula, relations, itemList) {
    let relationValues = {};
    let f = formula.toString();
    relations.map(function (t, i) {
        try {
            let item = itemList.filter(a => a.Id == t)[0];
            switch (item.Data.Type) {
                case 'Number':
                    relationValues[t] = getDataLinkValue(item, parseFloat) || 0; //item.itemValue || 0;
                    break;
                case 'SingleText':
                    relationValues[t] = '\'' + getDataLinkValue(item) + '\'';//'\'' + item.itemValue + '\'';
                    break;
                default:
                    relationValues[t] = '';
                    break;
            }
        }
        catch (e) {
            relationValues[t] = '';
        }
        f = f.replace(new RegExp('\u2800' + t + '\u2800', 'gm'), relationValues[t])
    });
    try {
        return formulaVal(f);
    }
    catch (e) {
        return 'formula error!';
    }
}
function getFormulatedBody(formBody, index, dataLinker) {
    if (dataLinker[index]) {
        dataLinker[index].map(function (rel, i) {
            let item = formBody.filter(a => a.Id == rel);
            if (item.length > 0) {
                let linker = item[0];
                switch (linker.Data.DataLinkType) {
                    case LINKTYPE.Linker:
                        break;
                    case LINKTYPE.Formula:
                        linker.itemValue = getFormulaValue(linker.Data.DataLinkValue, linker.Data.DataLinkOptions.relations, formBody);
                        formBody = getFormulatedBody(formBody, rel, dataLinker);
                        break;
                    case LINKTYPE.Resource:
                        break;
                }
            }
        });
    }
    return formBody;
}
function funcFix(fun) {
    let keys = formulaKeywords.toString().replace(/\,/g, '|');
    let mark = '\u2800';
    let list = fun.split(mark);
    let rex = new RegExp(`[^(${keys}|\%|\,|\(\)|\.|\+|\-|\*|\/|(0-9)|\\s*)]`, 'g');
    let rex2 = new RegExp('[^(\-|(0-9)|(a-z)|(A-Z))]', 'g');
    let final = '';
    let len = list.length;
    list.map(function (e, i) {
        let r;
        if (i % 2 == 0)
            r = rex;
        else
            r = rex2;
        final += e.replace(r, '');
        if (i < len - 1)
            final += mark;
    });
    return final;
}
export default {
    LINKTYPE,
    getDataLinkValue,
    initDataLinker,
    initBaseFormData,
    getFormulaValue,
    getFormulatedBody,
    funcFix
};
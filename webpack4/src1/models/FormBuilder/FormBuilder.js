import { browserHistory } from 'dva/router';
import { message } from 'antd';
import FormDragSource from '../../components/HOC/FormDragSource';
import FormSortDrop from '../../components/HOC/FormSortDrop';
import FormFocus from '../../components/HOC/FormFocus';
import com from '../../utils/com';
import FORMSTATUS from './FormStatus';
import { save, detail } from '../../services/FormBuilder/FormBuilder';
import { initDataLinker, getFormulatedBody, initBaseFormData } from '../../components/FormControl/DataLinker/DataLinker';
import FormControlList from '../../components/FormControl/FormContorlList';
import update from 'immutability-helper';
import queryString from 'query-string';

function setChange(item, state, status) {
    let newFormStatus = state.FormStatus;
    if (item.status != FORMSTATUS.Add)
        item.status = status;
    if (item.container != state.RootContainer) {
        let newItem = state.FormBody.filter(a => a.Id == item.container)[0];
        setChange(newItem, state, FORMSTATUS.Modify);
    }
    else if (newFormStatus != FORMSTATUS.Add) {
        newFormStatus = FORMSTATUS.Modify;
    }
    return newFormStatus;
}

export default {
    namespace: 'formBuilder',
    state: {
        ControlList: FormControlList,
        RootContainer: com.Guid(),
        FormTemplateId: com.Guid(),
        FormTemplateVersionId: null,
        FormBody: [],
        RootFormId: com.Guid(),
        FormTitle: '新建表单',
        FormStatus: FORMSTATUS.Add,
        LeftList: [],
        CurrentIndex: -1,
        DragIndex: -1,
        frm: -1,
        PreviewShow: false,
        PreviewList: [],
        PreviewRootList: [],
        IsSubmitting: false,
        IsUsed: false,
        DataLinker: {},
        TempDataLinkerOptions: null
    },
    subscriptions: {
        Init({ dispatch }) {
            dispatch({
                type: 'init'
            });
        },
        Open({ dispatch, history }) {
            return history.listen((location) => {
                let query = queryString.parse(location.search);
                if (query.id) {
                    dispatch({
                        type: 'beginLoadForm',
                        id: query.id
                    });
                }
            });
        }
    },
    effects: {
        *beginSave(action, { select, call, put }) {
            action.FormBody.map(function (a, i) {
                a.order = i;
            });
            let areas = action.FormBody.filter(a => a.Data.IsContainer);
            let items = action.FormBody.filter(a => !a.Data.IsContainer);
            let areaList = [], formList = [], formItemList = [];
            let FormTemplateId = action.FormTemplateId;
            let rootItems = items.filter(a => a.container == action.RootContainer);
            const userInfo = {
                UserId: '6EBBCF53-EC99-4380-B237-994D73E4F591',
                CompanyId: '6EBBCF53-EC99-4380-B237-994D73E4F592',
                UserName: 'TestUser'
            };
            if (action.FormStatus != FORMSTATUS.NoChange) {
                areaList.push({
                    Id: action.RootContainer,
                    FormTemplateId: FormTemplateId,
                    AreaType: 'Root',
                    Layer: 0,
                    SortIndex: 0,
                    OperationStatus: action.FormStatus,
                    ...userInfo
                })
                formList.push({
                    Id: action.RootFormId,
                    FormTemplateId: FormTemplateId,
                    Name: action.FormTitle,
                    AreaId: areaList[0].Id,
                    SortIndex: 0,
                    IsUsed: action.IsUsed,
                    OperationStatus: action.FormStatus,
                    ...userInfo
                });
                rootItems.map(function (e, i) {
                    formItemList.push({
                        Id: e.Id,
                        FormId: formList[0].Id,
                        Name: e.Data.Text,
                        ControlType: e.key,
                        Property: JSON.stringify(e.Data),
                        SortIndex: e.order,
                        OperationStatus: e.status,
                        ...userInfo
                    });
                });
                areas.map(function (e, i) {
                    const { FormId, ...other } = e.Data;
                    const areasItemList = items.filter(a => a.container == e.Id);
                    areaList.push({
                        Id: e.Id,
                        FormTemplateId: FormTemplateId,
                        AreaType: e.Data.ContainerType,
                        Layer: i,
                        ParentId: e.container,
                        SortIndex: e.order,
                        OperationStatus: e.status,
                        ...userInfo
                    });

                    if (e.Data.ContainerType == 'Tab') {
                        e.Data.TabKeys.map(function (t, ti) {
                            areaList.push({
                                Id: t.key,
                                FormTemplateId: FormTemplateId,
                                AreaType: 'TabKey',
                                Layer: ti,
                                ParentId: e.Id,
                                SortIndex: ti,
                                OperationStatus: t.status,
                                UserId: '6EBBCF53-EC99-4380-B237-994D73E4F591',
                                CompanyId: '6EBBCF53-EC99-4380-B237-994D73E4F592',
                                UserName: 'TestUser'
                            });
                            formList.push({
                                Id: t.FormId,
                                FormTemplateId: FormTemplateId,
                                Name: t.title,
                                AreaId: t.key,
                                SortIndex: ti,
                                OperationStatus: t.status,
                                ...userInfo
                            })
                        });
                        formList.push({
                            Id: FormId,
                            Name: '标签栏',
                            FormTemplateId: FormTemplateId,
                            AreaId: e.Id,
                            SortIndex: i,
                            OperationStatus: e.status,
                            ...userInfo
                        });
                    }
                    else {
                        formList.push({
                            Id: FormId,
                            Name: e.Data.Text,
                            FormTemplateId: FormTemplateId,
                            AreaId: e.Id,
                            SortIndex: e.order,
                            IsUsed: action.IsUsed,
                            OperationStatus: e.status,
                            ...userInfo
                        });
                    }

                    areasItemList.map(function (e, i) {
                        formItemList.push({
                            Id: e.Id,
                            FormId: FormId,
                            Name: e.Data.Text,
                            ControlType: e.key,
                            Property: JSON.stringify(e.Data),
                            SortIndex: e.order,
                            OperationStatus: e.status,
                            ...userInfo
                        });
                    });
                });
                let postData = {
                    Id: FormTemplateId,
                    Name: action.FormTitle,
                    AreaActionRequests: areaList,
                    FormsActionRequests: formList,
                    FormItemsActionRequests: formItemList,
                    FormTemplateVersionId: action.FormTemplateVersionId,
                    OperationStatus: action.FormStatus,
                    IsUsed: action.IsUsed,
                    Status: 0,
                    CategoryId: com.Guid(),
                    ...userInfo
                };
                //console.log(postData);
                yield put({ type: 'beginSubmitting' });
                const { data } = yield call(save, postData, action.FormStatus == FORMSTATUS.Add ? 'New' : 'Modify');
                message.config({
                    top: 110
                });
                if (data.IsValid) {
                    message.success('保存成功！', 5);
                    yield put({ type: 'endSubmitting' });
                }
                else {
                    message.error(data.ErrorMessages, 60);
                    yield put({ type: 'submitFailed' });
                }
            }
            else {
                message.info('没有需要保存的数据！', 5);
            }
        },
        *beginLoadForm(action, { select, call, put }) {
            const { data } = yield call(detail, { FormTemplateVersionId: '66d658d4-43ed-4e6d-8e46-f1e6093b59d6', companyId: '6EBBCF53-EC99-4380-B237-994D73E4F592' });
            if (data.IsValid) {
                let { Code, CreateUserName, ErrorMessages, FormVersion, FormVersionHistoryActionRequests,
                    FormVersionHistoryId, IsUpdateVersion, IsValid, Property, Remark, Status, UserName,
                    ...other } = data;
                yield put({
                    type: 'loadForm',
                    ...other
                });
            }
            else {
                message.error('错误：' + data.msg, 30);
                yield put({ type: 'loadFailed' });
            }
        }
    },
    reducers: {
        reload(state) {
            return { ...state, FormBody: [], RootContainer: com.Guid(), RootContainer: com.Guid(), DragIndex: -1, frm: -1, CurrentIndex: -1 };
        },
        init(state) {
            let list = [];
            state.ControlList.map(function (C, i) {
                let FD = FormDragSource(C.name, C.ico);
                list.push(FD);
            });
            return { ...state, LeftList: list, FormId: com.Guid(), FormTitle: '新建表单', };
        },
        beginSubmitting(state) {
            return { ...state, IsSubmitting: true };
        },
        endSubmitting(state) {
            let newFormBody = state.FormBody;
            newFormBody.map(function (a, i) {
                a.status = FORMSTATUS.NoChange;
            })
            return { ...state, IsSubmitting: false, FormStatus: FORMSTATUS.NoChange, FormBody: newFormBody };
        },
        submitFailed(state) {
            return { ...state, IsSubmitting: false };
        },
        loadFailed(state) {
            return { ...state };
        },
        loadForm(state, action) {
            let rootArea = action.AreaActionRequests.filter(a => a.AreaType == 'Root')[0];
            const RootContainer = rootArea.Id;
            const FormId = rootArea.FormTemplateId;
            let rootForm = action.FormsActionRequests.filter(a => a.AreaId == rootArea.Id)[0];
            const FormTitle = rootForm.Name;
            const FormStatus = FORMSTATUS.NoChange;
            let otherArea = action.AreaActionRequests.filter(a => a.AreaType != 'Root' && a.AreaType != 'TabKey');
            let tabKeyArea = action.AreaActionRequests.filter(a => a.AreaType == 'TabKey');
            let FormBody = [];
            otherArea.map(function (a, i) {
                let newItem = state.ControlList.filter(b => b.key == a.AreaType)[0];
                let form = action.FormsActionRequests.filter(b => b.AreaId == a.Id)[0];
                let area = {
                    Id: a.Id,
                    key: a.AreaType,
                    index: a.Id,
                    Component: FormSortDrop(FormDragSource(null, null, FormFocus(newItem.Component))),
                    WrappedComponent: newItem.Component,
                    Data: {
                        Type: `${a.AreaType}Panel`,
                        Text: form.Name,
                        IsContainer: true,
                        FormId: form.Id,
                        ContainerType: a.AreaType
                    },
                    container: a.ParentId,
                    status: FORMSTATUS.NoChange,
                    order: a.SortIndex
                };
                switch (a.AreaType) {
                    case 'Tab':
                        area.TypeName = '标签容器';
                        area.Data.TabKeys = [];
                        break;
                    case 'Card':
                        area.TypeName = '卡片容器';
                        area.Text = form.Name;
                        break;
                }
                FormBody.push(area);
            });

            tabKeyArea.map(function (a, i) {
                let tab = FormBody.filter(b => b.Id == a.ParentId);
                let form = action.FormsActionRequests.filter(b => b.AreaId == a.Id)[0];
                if (tab.length > 0) {
                    tab[0].Data.TabKeys.push({
                        title: form.Name,
                        key: a.Id,
                        FormId: form.Id,
                        status: FORMSTATUS.NoChange,
                        order: a.SortIndex
                    });
                    if (i == 0) {
                        tab[0].Data.ActiveKey = a.Id;
                    }
                }
            });
            action.FormItemsActionRequests.map(function (a, i) {
                let newItem = state.ControlList.filter(b => b.key == a.ControlType)[0];
                let form = action.FormsActionRequests.filter(b => b.Id == a.FormId)[0];
                let formItem = {
                    Id: a.Id,
                    key: a.ControlType,
                    index: a.Id,
                    Component: FormSortDrop(FormDragSource(null, null, FormFocus(newItem.Component))),
                    WrappedComponent: newItem.Component,
                    Data: JSON.parse(a.Property),
                    container: form.AreaId,
                    status: FORMSTATUS.NoChange,
                    order: a.SortIndex
                };
                FormBody.push(formItem);
            });
            FormBody = FormBody.sort(function (a, b) {
                return a.order - b.order;
            });
            let dataLinker = initDataLinker(FormBody);
            return {
                ...state, FormBody: FormBody, RootContainer: rootArea.Id,
                RootFormId: rootForm.Id, FormStatus: FORMSTATUS.NoChange,
                FormTemplateId: action.Id, FormTitle: action.Name,
                FormTemplateVersionId: action.FormTemplateVersionId,
                IsUsed: action.IsUsed, DataLinker: dataLinker
            };
        },
        PreviewShowFn(state) {
            const RootList = state.FormBody.filter(a => a.container == state.RootContainer);
            let dataLinker = initDataLinker(state.FormBody);
            state.FormBody.map(function (item) {
                item.itemValue = undefined;
            });
            let baseFormData = initBaseFormData(state.FormBody, dataLinker);
            return { ...state, PreviewList: state.FormBody, RootContainer: state.RootContainer, PreviewShow: true, DataLinker: dataLinker, FormBody: baseFormData }
        },
        PreviewHideFn(state) {
            return { ...state, PreviewList: [], PreviewShow: false }
        },
        addFormItem(state, action) {
            if (state.DragIndex == -1) {
                const { index, name, container } = action;
                let newItem = state.ControlList.filter(a => a.key == name);
                let newList = state.FormBody;
                if (newItem.length > 0)
                    newList.push({
                        Id: index,
                        key: name,
                        index: index,
                        Component: FormSortDrop(FormDragSource(null, null, FormFocus(newItem[0].Component))),
                        WrappedComponent: newItem[0].Component,
                        Data: newItem[0].Data(),
                        container: container,
                        status: FORMSTATUS.Add,
                    });
                return { ...state, FormBody: newList, DragIndex: action.index, frm: -1 };
            }
            else
                return { ...state };
        },
        //复制
        CopyFormItem(state, action) {
            const index = action.index;
            let newList = state.FormBody;
            const current = newList.filter(i => i.index === index)[0];
            let newItem = state.ControlList.filter(a => a.key == current.key);
            let gid = com.Guid();
            newList.push({
                Id: gid,
                key: current.key,
                index: gid,
                Component: current.Component,
                WrappedComponent: newItem[0].Component,
                Data: current.Data,
                container: current.container,
                status: FORMSTATUS.Add
            });
            return { ...state, FormBody: newList, }
        },
        removeFormItem(state, action) {
            const index = action.index;
            const c = state.FormBody.filter(i => i.index === index)[0];
            let newFormStatus = state.FormStatus;
            let newFormBody = state.FormBody;
            let fidx = state.FormBody.indexOf(c);
            if (c.Data.IsContainer) {
                let list = com.GetChildCList(c, state.FormBody);
                let flag = true;
                for (let i = 0; i < newFormBody.length; flag ? i++ : i) {
                    let exist = list.filter(a => a.index == newFormBody[i].index);
                    if (exist.length > 0) {
                        if (exist[0].status == FORMSTATUS.Add) {
                            //newFormBody.splice(i, 1);
                            newFormBody = update(state.FormBody, {
                                $splice: [
                                    [i, 1],
                                ]
                            });
                            flag = false;
                        }
                        else
                            exist[0].status = FORMSTATUS.Delete;
                    }
                    else {
                        flag = true;
                    }
                }
                if (newFormBody[fidx].status == FORMSTATUS.Add) {
                    //newFormBody = state.FormBody.splice(fidx, 1);
                    newFormBody = update(state.FormBody, {
                        $splice: [
                            [fidx, 1]
                        ]
                    });
                }
                else {
                    newFormStatus = setChange(newFormBody[fidx], state, FORMSTATUS.Delete);
                }
            }
            else {
                if (newFormBody[fidx].status == FORMSTATUS.Add) {
                    //newFormBody = state.FormBody.splice(fidx, 1);
                    newFormBody = update(state.FormBody, {
                        $splice: [
                            [fidx, 1]
                        ]
                    });
                }
                else {
                    newFormStatus = setChange(newFormBody[fidx], state, FORMSTATUS.Delete);
                }
            }
            return { ...state, FormBody: newFormBody, CurrentIndex: -1, FormStatus: newFormStatus };
        },
        removeTabItem(state, action) {
            debugger
            let list = state.FormBody.filter(a => a.Data.TabKey == action.TabKey);
            let newFormBody = state.FormBody;
            let flag = true;
            for (let i = 0; i < newFormBody.length; flag ? i++ : i) {
                let exist = list.filter(a => a.index == newFormBody[i].index);
                if (exist.length > 0) {
                    if (newFormBody[i].status == FORMSTATUS.Add) {
                        //newFormBody.splice(i, 1);
                        newFormBody = update(state.FormBody, {
                            $splice: [
                                [i, 1],
                            ]
                        });
                        flag = false;
                    }
                    else
                        newFormBody[i].status = FORMSTATUS.Delete;
                }
                else {
                    flag = true;
                }
            }
            let tab = newFormBody.filter(a => a.index == action.index)[0];
            let tItem = tab.Data.TabKeys.filter(a => a.key == action.TabKey)[0];
            let index = tab.Data.TabKeys.indexOf(tItem);
            if (tab.Data.TabKeys[index].status == FORMSTATUS.Add) {
                //tab.Data.TabKeys = tab.Data.TabKeys.splice(index, 1);
                tab.Data.TabKeys = update(tab.Data.TabKeys, {
                    $splice: [
                        [index, 1],
                    ]
                });
            }
            else {
                tab.Data.TabKeys[index].status = FORMSTATUS.Delete;
            }
            return { ...state, FormBody: newFormBody };
        },
        moveFormItem(state, action) {
            let { frm, to } = action;
            if (frm == -1 && state.DragIndex != -1)
                frm = state.DragIndex;
            const frmC = state.FormBody.filter(i => i.index === frm)[0];
            const toC = state.FormBody.filter(i => i.index == to)[0];
            let fidx = state.FormBody.indexOf(frmC);
            let tidx = state.FormBody.indexOf(toC);
            let newFormStatus = null, newChange = [], existC = [state.FormBody[fidx].container, state.FormBody[tidx].container];
            let newFormBody = update(state.FormBody, {
                $splice: [
                    [fidx, 1],
                    [tidx, 0, frmC]
                ]
            });
            for (let i = Math.min(fidx, tidx); i < newFormBody.length; i++) {
                if (existC.indexOf(newFormBody[i].container) > -1)
                    newFormStatus = setChange(newFormBody[i], state, FORMSTATUS.Modify);
            }
            if (action.isContainer) {
                switch (action.direction) {
                    case 'top':
                        if (fidx > tidx)
                            return { ...state, FormBody: newFormBody };
                        break;
                    case 'bottom':
                        if (fidx < tidx)
                            return { ...state, FormBody: newFormBody };
                        break;
                    default:
                        break;
                }
                return { ...state };
            }
            else {
                return { ...state, FormBody: newFormBody, FormStatus: newFormStatus };
            }
        },
        cancelMoveFormItem(state, action) {
            if (state.DragIndex == -1) {
                if (action.hasOwnProperty("index")) {
                    let toC = state.FormBody.filter(i => i.index === state.frm)[0];
                    let frmC = state.FormBody.filter(i => i.index === action.index)[0];
                    frmC.container = state.oldContainer || state.RootContainer;
                    let fidx = state.FormBody.indexOf(frmC);
                    let tidx = state.FormBody.indexOf(toC);
                    if (fidx != tidx) {
                        let newFormBody = update(state.FormBody, {
                            $splice: [
                                [fidx, 1],
                                [tidx, 0, frmC]
                            ]
                        });
                        return { ...state, FormBody: newFormBody };
                    }
                    return { ...state };
                }
                else
                    return { ...state };
            }
            else {
                const index = state.DragIndex;
                let c = state.FormBody.filter(a => a.index == index)[0];
                let order = state.FormBody.indexOf(c);
                const newFormBody = update(state.FormBody, {
                    $splice: [
                        [order, 1]
                    ]
                });
                return { ...state, FormBody: newFormBody, DragIndex: -1 };
            }
        },
        beginDragItem(state, action) {
            const index = state.DragIndex == -1 ? action.index : state.DragIndex;
            const c = state.FormBody.filter(a => a.index == index)[0];
            return { ...state, frm: c.index };
        },
        endDragItem(state, action) {
            if (action.hasOwnProperty('name')) {
                return { ...state, DragIndex: -1, frm: -1, to: -1 };
            } else {
                return { ...state };
            }
        },
        setCurrent(state, action) {
            if (action.hasOwnProperty('index')) {
                let index = -1;
                if (state.FormBody.filter(a => a.index == action.index).length > 0) {
                    index = action.index;
                }
                return { ...state, CurrentIndex: index };
            }
            return { ...state }
        },
        setData(state, action) {
            let exist = state.FormBody.filter(a => a.index == action.index);
            if (exist.length > 0) {
                let newBody = state.FormBody;
                let oldData = exist[0];
                let idx = state.FormBody.indexOf(oldData);
                newBody[idx].Data = { ...newBody[idx].Data, ...action.Data };
                let newFormStatus = setChange(newBody[idx], state, FORMSTATUS.Modify);
                return { ...state, FormBody: newBody, FormStatus: newFormStatus };
            }
            return { ...state };
        },
        setValue(state, action) {
            let exist = state.FormBody.filter(a => a.index == action.index);
            if (exist.length > 0) {
                let newBody = state.FormBody;
                let oldData = exist[0];
                let idx = state.FormBody.indexOf(oldData);
                newBody[idx].itemValue = action.Value;
                newBody = getFormulatedBody(newBody, action.index, state.DataLinker);
                return { ...state, FormBody: newBody };
            }
            return { ...state };
        },
        setTitle(state, action) {
            return { ...state, FormTitle: action.FormTitle, FormStatus: FORMSTATUS.Modify };
        },
        changeContainer(state, action) {
            let C = state.FormBody.filter(a => a.index == action.index)[0];
            if (C.container != action.to) {
                let oldContainer = C.container;
                C.container = action.to;
                if (action.to != state.RootContainer) {
                    const NewContainer = state.FormBody.filter(a => a.index == action.to)[0];
                    switch (NewContainer.Data.ContainerType) {
                        case "Card":
                            C.Data = { ...C.Data }
                            break;
                        case "Tab":
                            C.Data = { ...C.Data, TabKey: NewContainer.Data.ActiveKey }
                            break;
                    }
                }
                let newFormStatus = setChange(C, state, FORMSTATUS.Modify);
                return { ...state, FormStatus: newFormStatus, oldContainer: oldContainer };
            }
            else
                return { ...state };
        },
        setTempDataLinkerOptions(state, action) {
            return { ...state, TempDataLinkerOptions: action.options };
        },
        saveSuccess(state, action) {
            return { ...state };
        }
    }
}
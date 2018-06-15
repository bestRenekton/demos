import { message } from 'antd';
import com from '../../utils/com';
import FORMSTATUS from '../FormBuilder/FormStatus';
import { saveInst, loadInst, detail } from '../../services/FormBuilder/FormBuilder';
import { initDataLinker } from '../../components/FormControl/DataLinker/DataLinker';
import FormControlList from '../../components/FormControl/FormContorlList';
import queryString from 'query-string';

export default {
    namespace: 'formViewer',
    state: {
        ControlList: FormControlList,
        RootContainer: com.Guid(),
        FormTemplateId: com.Guid(),
        FormTemplateVersionId: null,
        FormInstanceId: com.Guid(),
        FormTemplateInstanceId: com.Guid(),
        FormBody: [],
        RootFormId: com.Guid(),
        FormStatus: FORMSTATUS.Add,
        FormTitle: '',
        IsSubmitting: false,
        DataLinker: {}
    },
    subscriptions: {
        Open({ dispatch, history }) {
            return history.listen((location) => {
                let query = queryString.parse(history.search);
                if (query.id && query.instid) {
                    dispatch({
                        type: 'beginLoadForm',
                        id: query.id,
                        instId: query.instid
                    });
                }
                else if (query.id) {
                    dispatch({
                        type: 'beginLoadForm',
                        id: query.id
                    });
                }
            });
        }
    },
    effects: {
        *beginSubmit(action, { select, call, put }) {
            //yield put({ type: 'beginSubmitting' });
            let instId = action.FormInstanceId;
            let formTempInstId = action.FormTemplateInstanceId;
            let postData = {
                FormTemplateVersionId: action.FormTemplateVersionId,
                FormInstanceActionRequests: [{
                    Id: instId,
                    FormVersionId: action.FormTemplateVersionId,
                    FormTemplateInstanceId: formTempInstId,
                    FormItemValuesActionRequests: [],
                    OperationStatus: action.FormStatus
                }],
                FormTemplateInstanceActionRequest: {
                    Id: formTempInstId,
                    FormTemplateVersionId: action.FormTemplateVersionId,
                    OperationStatus: action.FormStatus
                },
                OperationStatus: action.FormStatus
            };
            let submitItems = action.FormStatus == FORMSTATUS.Add ?
                action.FormBody.filter(a => a.status == FORMSTATUS.Add) :
                action.FormBody.filter(a => a.status == FORMSTATUS.Modify);
            submitItems.map(function (f, i) {
                postData.FormInstanceActionRequests[0].FormItemValuesActionRequests.push({
                    Id: f.itemId,
                    Value: f.itemValue || '',
                    FormItemId: f.Id,
                    FormInstanceId: instId,
                    OperationStatus: action.FormStatus,
                });
            });
            debugger
            const { data } = yield call(saveInst, postData);
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
        },
        *beginLoadForm(action, { select, call, put }) {
            const { data } = action.instId ?
                yield call(loadInst, { formTemplateInstanceId: '2b02b46c-851a-cf32-25a5-bd11a009e86a', companyId: '6EBBCF53-EC99-4380-B237-994D73E4F592' }) :
                yield call(detail, { FormTemplateVersionId: '414f2a24-4a5b-4138-9c9c-38e3862343df', companyId: '6EBBCF53-EC99-4380-B237-994D73E4F592' });
            if (data.IsValid) {
                let { Code, CreateUserName, ErrorMessages, FormVersion, FormVersionHistoryActionRequests,
                    FormVersionHistoryId, IsUpdateVersion, IsValid, Property, Remark, Status, UserName,
                    ...other } = data;
                yield put({
                    type: 'loadForm',
                    FormStatus: action.instId ? FORMSTATUS.NoChange : FORMSTATUS.Add,
                    FormTemplateInstanceId: action.instId ? data.FormTemplateInstanceActionRequest.Id : undefined,
                    FormInstanceId: action.instId ? data.FormInstanceActionRequests[0].Id : undefined,
                    ...other
                });
            }
            else {
                message.error('ErrorMessages', 30);
                yield put({ type: 'loadFailed' });
            }
        }
    },
    reducers: {
        reload(state) {
            return { ...state, FormBody: [], RootContainer: com.Guid(), RootContainer: com.Guid(), DragIndex: -1, frm: -1, CurrentIndex: -1 };
        },
        beginSubmitting(state) {
            return { ...state, IsSubmitting: true };
        },
        submit(state, action) {

            return { ...state };
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
            const FormStatus = action.FormStatus;
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
                    Component: newItem.Component,
                    Data: {
                        Type: `${a.AreaType}Panel`,
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
                        area.Data.TypeName = '标签容器';
                        area.Data.TabKeys = [];
                        break;
                    case 'Card':
                        area.Data.TypeName = '卡片容器';
                        area.Data.Text = form.Name;
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
                let itemValue = action.FormInstanceActionRequests ? action.FormInstanceActionRequests[0].FormItemValuesActionRequests.filter(b => b.FormItemId == a.Id)[0] : undefined;
                let formItem = {
                    Id: a.Id,
                    key: a.ControlType,
                    index: a.Id,
                    Component: newItem.Component,
                    Data: JSON.parse(a.Property),
                    container: form.AreaId,
                    status: FORMSTATUS.NoChange,
                    order: a.SortIndex,
                    itemValue: itemValue ? (itemValue.Value == '' ? undefined : itemValue.Value) : undefined,
                    itemId: itemValue ? itemValue.Id : comd.Guid()
                };
                FormBody.push(formItem);
            });
            FormBody = FormBody.sort(function (a, b) {
                return a.order - b.order;
            });
            let dataLinker = initDataLinker(FormBody);
            let baseFormData = initBaseFormData(state.FormBody, dataLinker);
            return {
                ...state, FormBody: baseFormData, RootContainer: rootArea.Id,
                RootFormId: rootForm.Id, FormTemplateId: action.Id, FormTitle: action.Name,
                FormTemplateVersionId: action.FormTemplateVersionId, FormStatus: FormStatus,
                FormInstanceId: action.FormInstanceId, formTemplateInstanceId: action.formTemplateInstanceId,
                DataLinker: dataLinker
            };
        },
        setValue(state, action) {
            let exist = state.FormBody.filter(a => a.index == action.index);
            if (exist.length > 0) {
                let newBody = state.FormBody;
                let oldData = exist[0];
                let idx = state.FormBody.indexOf(oldData);
                let obj = {};
                obj[idx.toString()] = { itemValue: { $set: action.Value }, status: { $set: state.FormBody[idx].status == FORMSTATUS.Add ? FORMSTATUS.Add : FORMSTATUS.Modify } };
                newBody[index].itemValue = action.Value;
                newBody[index].status = newBody[index].status == FORMSTATUS.Add ? FORMSTATUS.Add : FORMSTATUS.Modify;
                return { ...state, FormBody: newBody, FormStatus: state.FormStatus == FORMSTATUS.Add ? FORMSTATUS.Add : FORMSTATUS.Modify };
            }
            return { ...state };
        },
        saveSuccess(state, action) {
            return { ...state };
        }
    }
}
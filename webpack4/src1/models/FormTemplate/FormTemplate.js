import { browserHistory } from 'dva/router'
import { query } from '../../services/Main/Main'
import com from '../../utils/com'
import { Input } from 'antd';
export default {
    namespace: 'formTemplate',
    state: {
        PreviewShow: false,
        PreviewList: [],
        ControlList: [],
        CurrentControl: {
            Type: "",
            Text: "",
            Component: "",
            Id: "",
            Attribute: {}
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/tea') {
                    let ControlData = [
                        {
                            Type: "SingleText",
                            TypeName: "单行文本",
                            Text: "单行文本",
                            Component: <Input />,
                            Id: com.Guid(),
                            Attribute: {
                                Desc: "",//描述
                                DefaultValue: "",//默认值
                                FormartText: "none",//格式
                                FormartValue: null,
                                Required: true,//必填
                                Visible: true,//可见
                                Editable: true//可编辑
                            }
                        },
                        {
                            Type: "MutText",
                            TypeName: "多行文本",
                            Text: "多行文本",
                            Component: <Input.TextArea />,
                            Id: com.Guid(),
                            Attribute: {
                                Desc: "",//描述
                                DefaultValue: "",//默认值
                                FormartText: "none",//格式
                                FormartValue: null,
                                Required: false,//必填
                                Visible: true,//可见
                                Editable: true//可编辑
                            }
                        }
                    ]

                    dispatch({
                        type: 'Init',
                        payload: { control: ControlData }
                    });
                }
            });
        },

    },
    effects: {

    },
    reducers: {
        PreviewShowFn(state) {
            return { ...state, PreviewList: state.ControlList, PreviewShow: true }
        },
        PreviewHideFn(state) {
            return { ...state, PreviewList: [], PreviewShow: false }
        },
        Init(state, action) {
            debugger
            var control = action.payload.control;
            var l = [];
            for (let i = 0; i < control.length; i++) {
                l.push(control[i]);
            }


            return { ...state, ControlList: l, CurrentControl: l[0] }
        },
        //当前选中控件
        SetCurrentControl(state, action) {
            return { ...state, CurrentControl: action.payload.control }
        },
        //更改标题
        SetCurrentControlTitle(state, action) {
            var c = state.CurrentControl;
            c.Text = action.payload.Text;
            return { ...state, CurrentControl: c }
        },
        //更改描述
        SetCurrentControlDesc(state, action) {
            var c = state.CurrentControl;
            c.Attribute.Desc = action.payload.Text;
            return { ...state, CurrentControl: c }
        },
        //更改格式
        SetCurrentControlFormart(state, action) {
            debugger
            var type = action.payload.type;
            var formart = com.ControlFormart(type);
            var c = state.CurrentControl;
            c.Attribute.FormartText = type;
            c.Attribute.FormartValue = formart;
            return { ...state, CurrentControl: c };
        },
        //更改校验必填
        SetCurrentControlSwitch(state, action) {
            var c = state.CurrentControl;
            c.Attribute[action.payload.type] = action.payload.checked;
            return { ...state, CurrentControl: c };
        }

    }
}
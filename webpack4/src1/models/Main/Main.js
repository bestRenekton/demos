import { browserHistory } from 'dva/router'
import { query } from '../../services/Main/Main'
import com from '../../utils/com'
import Welcome from '../../routes/Welcome/Welcome'
import update from 'immutability-helper';
import Immutable from "immutable";

export default {
    namespace: 'appMain',
    state: {
        collapsed: false,
        user: {
            name: "lzn"
        },
        bread: [],
        menu: [],
        panes: [{ key: 'welcome', title: '欢迎', link: '/welcome', closeable: false, component: Welcome }],
        activeKey: "welcome"
    },
    subscriptions: {
        initMenu({ dispatch }) {
            dispatch({
                type: "QueryMenu"
            })
        }
    },
    effects: {
        *QueryMenu({ payload }, { put, call }) {
            const { data,err } = yield call(query);
            console.log("获取数据成功没");
            // console.log(data);
            // console.log(err);
            yield put({
                type: "QuerySuccess",
                payload: data
            })
        },
        *LoginOut({history}) {
            com.SetCookie('token', '');
            history.push('/');
        }
    },
    reducers: {
        toggleCollapsed: function (state) {
            let newState = update(state,{collapsed:{$set:!state.collapsed}});
            // console.log(newState);
            return newState;
        },
        LoginChangeUser(state, payload) {
            return { ...state }
        },
        QuerySuccess(state, action) {
            return { ...state, menu: action.payload.trees, bread: action.payload.bread }
        },
        removeTab(state,action){
            const tempPanes = update(state.panes,{$splice: [[action.index,1]]});
            return {...state,panes:tempPanes};
        },
        /* 添加panes */
        PanesAdd(state,action){
            // console.log(action);
            const tempPanes = update(state.panes,{$push:[action.payload]});
            // console.log(tempPanes);
            return {...state,panes:tempPanes}
        },
        /* 修改 activeKey */
        ChangeActiveKey(state,action){
            return {...state,activeKey:action.payload}
        }
    }
    
}
import axios from '../public/js/axios.js'
import { message } from 'antd';
import { DvaModel } from '../interfaces/index';

// export default {
//   namespace: 'main',
//   state: {
//     test: 1,
//     list:[1,2]
//   },
//   subscriptions: {
//     Init({ dispatch, history }) {
//       history.listen((location) => {
//       });
//     },
//   },

//   effects: {
//     *fetchInit({ payload }, { call, put, select }) {  //首次加载
//       axios({
//         method: 'post',
//         url: `FormTemplate/GetForModify`,
//         data: payload
//       })
//         .then(function (res) {
//           if (res.name) {
//             message.success('载入成功！');
//             dispatch({
//               type: 'formBuilder/loadForm',
//               ...res
//             })
//           }
//           else {
//             message.error('错误：' + data.msg, 30);
//             dispatch({
//               type: 'formBuilder/loadFailed',
//             })
//             // yield put({ type: 'loadFailed' });
//           }
//         })
//         .catch(function (err) {
//           console.log(err);
//         });
//     },
//   },

//   reducers: {
//     save(state, action) {
//       return { ...state, ...action.payload };
//     },
//   },

// };


const model: DvaModel<any> = {

  namespace: 'main',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * fetch(action, sagaEffects) {

    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};

export default model

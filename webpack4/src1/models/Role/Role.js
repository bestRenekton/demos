import { parse } from 'qs';
import { query, remove, add, update, queryUser, removeRoleEmployee, addRoleEmployee } from '../../services/Role/Role'
import { addGroup, queryTree, queryGroup, updateGroup, removeGroup } from '../../services/Role/RoleGroup'
import { getOrganizationLower } from '../../services/Organization/Organization'
import { message } from 'antd';
import { queryEmployee, queryEmployeeByOrg } from '../../services/Employee/Employee'
import config from '../../utils/config';
import { stat } from 'fs';
import index from 'antd/lib/timeline';
export default {
  namespace: 'role',
  state: {
    list: [],
    total: null,
    loading: false,
    current: null,
    pageSize: null,
    currentItem: {},
    modalVisible: false,
    modalType: 'group',
    groupList: [],
    flag: false,
    orgList: [],
  },
  subscriptions: {
    sb({ history, dispatch }) {
      // 监听 history 变化，当进入 `/` 时触发 `load` action
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'load' });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      yield put({ type: "showLoading" });
      const { data } = yield call(query, parse(payload));
      if (data) {
        yield put({
          type: 'QuerySuccess',
          payload: {
            list: data,
          }
        })
      }
    },
    *add({ payload }, { select, call, put }) {
      const { data } = yield call(add, parse(payload.newData));
      if (data.IsValid) {
        yield put({
          type: 'QuerySuccess',
          payload: {
            list: payload.list
          }
        })
        // yield put({ type: 'hideModal' });
      } else {
        yield put({
          type: 'updateFail',
          payload: { flag: false, message: data.ErrorMessages },
        })
      }
    },
    *'Remove'({ payload }, { select, call, put }) {
      // yield put({ type: 'showLoading' });
      const { data } = yield call(remove, parse(payload));
      // const pageIndex = yield select(({ users }) => users.current)
      // if (data && data.success) {
      //   yield put({
      //     type: 'query',
      //     payload: { page: pageIndex, pageSize: config.pageSize },
      //   })
      // }
    },
    *update({ payload }, { select, call, put }) {
      const { data } = yield call(update, parse(payload));
      yield put({
        type: 'updateSuccess',
        payload: { model: payload, status: data.IsValid, message: data.ErrorMessages },
      })
    },
    *queryUser({ payload }, { call, put }) {
      yield put({ type: "showUserLoading" });
      const { data } = yield call(queryEmployee, parse(payload));
      if (data) {
        yield put({
          type: 'QueryUserSuccess',
          payload: {
            userList: data.EmployeeList,
            total: data.Pagination.TotalCount,
            // current: data.Pagination.pageIndex
          }
        })
      }
    },
    *addGroup({ payload }, { select, call, put }) {
      const { data } = yield call(addGroup, parse(payload.newData));

      if (data.IsValid) {
        yield put({
          type: 'QuerySuccess',
          payload: {
            list: payload.list
          }
        })
        // yield put({ type: 'hideModal' });
      } else {
        yield put({
          type: 'updateFail',
          payload: { flag: false, message: data.ErrorMessages },
        })
      }

    },
    *queryTree({ payload }, { call, put }) {
      yield put({ type: "showLoading" });
      const { data } = yield call(queryTree, parse(payload));
      if (data) {
        yield put({
          type: 'QueryTreeSuccess',
          payload: {
            list: data.RoleCategoryTreeItems,
          }
        })
      }
    },
    *modify({ payload }, { select, call, put }) {
      yield put({
        type: 'QuerySuccess',
        payload: {
          list: payload
        }
      })
      yield put({ type: 'hideModal' });
    },
    *queryGroup({ payload }, { call, put }) {
      const { data } = yield call(queryGroup, parse(payload));
      if (data) {
        yield put({
          type: 'QueryGroupSuccess',
          payload: {
            list: data,
          }
        })
      }
    },
    *updateGroup({ payload }, { select, call, put }) {
      const { data } = yield call(updateGroup, parse(payload));
      yield put({
        type: 'updateGroupSuccess',
        payload: { model: payload, status: data.IsValid, message: data.ErrorMessages },
      })
    },
    *removeGroup({ payload }, { select, call, put }) {
      const { data } = yield call(removeGroup, parse(payload));
    },
    *getTree({ payload }, { call, put }) {
      const { data } = yield call(getOrganizationLower, parse(payload));
      if (data) {
        yield put({
          type: 'GetOrganizationSuccess',
          payload: {
            list: data,
            roleId: payload.roleId
          }
        })
      }
    },
    *getTreeNode({ payload }, { call, put }) {
      const { data } = yield call(getOrganizationLower, parse(payload));
      if (data) {
        yield put({
          type: 'GetTreeNodeSuccess',
          payload: {
            Id: payload,
            list: data,
          }
        })
      }
    },
    *removeRoleEmployee({ payload }, { select, call, put }) {
      const { data } = yield call(removeRoleEmployee, parse(payload));
      var str = { PageIndex: 1, PageSize: config.pageSize, RoleId: payload.RelationEmployeeRoleListActionRequests[0].RoleId };
      yield put({
        type: 'queryUser',
        payload: str,
      })
    },
    *getEmployeeByOrg({ payload }, { call, put }) {
      const { data } = yield call(queryEmployeeByOrg, parse(payload));
      if (data) {
        yield put({
          type: 'GetEmployeeByOrgSuccess',
          payload: {
            userList: data
          }
        })
      }
    },
    *addRoleEmp({ payload }, { call, put }) {
      const { data } = yield call(addRoleEmployee, parse(payload));
      var str = { PageIndex: 1, PageSize: config.pageSize, RoleId: payload.RelationEmployeeRoleListActionRequests[0].RoleId };
      yield put({
        type: 'queryUser',
        payload: str,
      })
    }
  },
  reducers: {
    showLoading(state, action) {
      return { ...state, loading: true }
    }, // 控制加载状态的 reducer
    showModal(state, action) {
      return { ...state, ...action.payload, modalVisible: true, modalType: action.payload.modalType }
    }, // 控制 Modal 显示状态的 reducer
    hideModal(state, action) {
      return { ...state, modalVisible: false }
    },
    QuerySuccess(state, action) {
      return { ...state, list: action.payload.list, loading: false, modalVisible: false }
    },
    createSuccess(state, action) {
      return { ...state, ...action.payload, loading: false }
    },
    deleteSuccess(state, action) {
      const id = action.payload;
      const newList = state.list.filter(user => user.id !== id);
      return { ...state, list: newList, loading: false };
    },
    updateSuccess(state, action) {
      const index = state.list.findIndex(item => item.Id === action.payload.model.RoleCategoryId);
      const model = state.list[index].RoleItems.find(item => item.Id === action.payload.model.Id);
      model['Name'] = action.payload.model.Name;
      model['editable'] = !action.payload.status;
      if (!action.payload.status) {
        message.error(action.payload.message);
      }
      return { ...state, status: action.payload.status, messageInfo: action.payload.message }
    },
    updateGroupSuccess(state, action) {
      const model = state.list.find(item => item.Id === action.payload.model.Id);
      model['Name'] = action.payload.model.Name;
      model['editable'] = !action.payload.status;
      if (!action.payload.status) {
        message.error(action.payload.message);
      }
      return { ...state, status: action.payload.status, messageInfo: action.payload.message }
    },
    showUserLoading(state, action) {
      return { ...state, userLoading: true }
    },
    QueryUserSuccess(state, action) {
      return { ...state, userList: action.payload.userList, userLoading: false, total: action.payload.total, modalVisible: false }
    },
    QueryTreeSuccess(state, action) {
      return { ...state, list: action.payload.list, loading: false }
    },
    QueryGroupSuccess(state, action) {
      return { ...state, groupList: action.payload.list, modalVisible: true, modalType: "role" }
    },
    updateFail(state, action) {
      message.error(action.payload.message);
      return { ...state };
    },
    GetOrganizationSuccess(state, action) {
      return {
        ...state, orgList: action.payload.list, modalVisible: true, modalType: "employee",
        roleId: action.payload.roleId, empList: ''
      }
    },
    GetTreeNodeSuccess(state, action) {
      const vv = state.orgList.find(item => item.Id == action.payload.Id.ParentId);
      var pos = action.payload.Id.pos;
      //根据坐标,插入子元素
      var obj = state.orgList;
      var strs = pos.split("-");
      strs.forEach(function (value, index, array) {
        if (index > 0) {
          if (index > 1)
            obj = obj.children[value];
          else
            obj = obj[value];
        }
      });
      obj.children = action.payload.list;
      return { ...state, orgList: state.orgList }
    },
    GetEmployeeByOrgSuccess(state, action) {
      return { ...state, empList: action.payload.userList }
    }
  }
}
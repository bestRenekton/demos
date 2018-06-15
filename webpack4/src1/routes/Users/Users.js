import React, { PropTypes } from 'react';
import { connect } from 'dva';
import UserList from '../../components/Users/List';
import UserSearch from '../../components/Users/Search';
import UserModal from '../../components/Users/UserModal';
import config from '../../utils/config';
const Users = ({ location, dispatch, users }) => {
  const {
    loading, list, total, current, field, keyword,
    currentItem, modalVisible, modalType, pageSize
    } = users;
  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk(data) {
      dispatch({
        type: `users/${modalType}`,
        payload: data
      })
    },
    onCancel() {
      dispatch({
        type: 'users/hideModal'
      })
    }
  };
  const ListProps = {
    dataSource: list,
    loading,
    total,
    current,
    Init() {
      dispatch({
        type: 'users/query',
        payload: { page: 1, pageSize: config.pageSize }
      })
    },
    onPageChange(pageIndex, pageSize) {
      dispatch({
        type: 'users/query',
        payload: { page: pageIndex, pageSize: pageSize }
      })
    },
    onDeleteItem(id) {

      dispatch({
        type: 'users/delete',
        payload: id
      })
    },
    onEditItem(record) {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'update',
          currentItem: record
        }
      })
    }
  }
  const userSearchProps = {
    field,
    keyword,
    OnSearch(filedsValue) {
      dispatch({
        type: 'users/query',
        payload: filedsValue,
      })
    },
    OnAdd() {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'create'
        }
      })
    },

  };
  const UserModalGen = () =>
    <UserModal {...userModalProps} />;
  return (
    <div>
      <UserSearch {...userSearchProps} />
      <UserList {...ListProps} />
      <UserModalGen />
    </div>
  )
}

//监听属性，建立组件和数据的映射关系
function mapStateToProps( {users} ) {
  return { users };
}
//关联model
export default connect(mapStateToProps)(Users);
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import com from '../../utils/com'
import UserList from '../../components/Role/List';
import RoleModal from '../../components/Role/RoleModal';
import config from '../../utils/config';
const Role = ({ location, dispatch, role }) => {
  const { list, total, current, field, keyword,
    currentItem, modalVisible, modalType, pageSize, userList, userLoading, groupList, orgList, empList, roleId } = role;
  const roleModalProps = {
    item: modalType === 'group',
    type: modalType,
    groupList: groupList,
    orgList: orgList,
    empList: empList,
    visible: modalVisible,
    roleId: roleId,
    onOk(data) {
      var newId = com.Guid();
      const newData = {
        Id: newId,
        Name: data,
        Status: 1,
        RoleItems: []
      };
      dispatch({
        type: `role/addGroup`,
        payload: { newData: newData, list: [...list, newData] }
      })
    },
    onAddRole(name, group) {
      let newData = {
        Id: com.Guid(),
        Name: name,
        Status: 1,
        RoleCategoryId: group
      };
      const findIndex = list.findIndex(item => item.Id == group);
      list[findIndex].RoleItems.push(newData);
      dispatch({
        type: `role/add`,
        payload: { newData: newData, list: list }
      })
    },
    onCancel() {
      dispatch({
        type: 'role/hideModal'
      })
    },
    loadTree(ParentId, pos) {
      dispatch({
        type: `role/getTreeNode`,
        payload: { ParentId: ParentId, companyId: "1B9B83BA-4E97-4C72-8832-BD28CC152E4A", pos: pos }
      })
    },
    getEmployeeByOrg(orgId) {
      dispatch({
        type: 'role/getEmployeeByOrg',
        payload: { OrganziationId: orgId }
      })
    },
    onAddEmp(selectEmp, roleId) {
      var roleEmpList = [];
      selectEmp.forEach(element => {
        roleEmpList.push({ Id: com.Guid(), RoleId: roleId, EmployeeId: element, Status: 1 });
      });
      dispatch({
        type: `role/addRoleEmp`,
        payload: { RelationEmployeeRoleListActionRequests: roleEmpList }
      })
    }
  };

  const ListProps = {
    dataSource: list,
    userData: userList,
    userLoading,
    total: total,
    current,
    Init() {
      dispatch({
        type: 'role/queryTree',
        payload: { companyId: '63948D7B-8F29-4BFE-9C61-78893EB2C57D' }
      })
    },
    onDelete(id, groupId) {
      if (groupId != undefined) {
        var index = list.findIndex(item => item.Id == groupId);
        var sss = list[index].RoleItems.findIndex(item => item.Id == id);
        list[index].RoleItems.splice(sss, 1);
        dispatch({
          type: `role/modify`,
          payload: list
        })
        dispatch({
          type: 'role/Remove',
          payload: { roleActionId: id, companyId: id }
        })
      } else {
        var index = list.findIndex(item => item.Id == id);
        list.splice(index, 1);
        dispatch({
          type: `role/modify`,
          payload: list
        })
        dispatch({
          type: 'role/removeGroup',
          payload: { roleCategoryActionId: id, companyId: id }
        })
      }

    },
    onEditItem(newId, roleText, groupId) {
      if (groupId != undefined) {
        // const index = list.findIndex(item => item.Id === groupId);
        // const model = list[index].RoleItems.find(item => item.Id === newId);
        // model['Name'] = roleText;
        dispatch({
          type: 'role/update',
          payload: { Id: newId, Name: roleText, RoleCategoryId: groupId }
        })
      }
      else {
        dispatch({
          type: 'role/updateGroup',
          payload: { Id: newId, Name: roleText }
        })
      }
    }, InitEmployee(index, roleId) {
      dispatch({
        type: 'role/queryUser',
        payload: { PageIndex: index, PageSize: config.pageSize, RoleId: roleId }
      })
    }, OnAddShow() {
      dispatch({
        type: 'role/showModal',
        payload: {
          modalType: 'group'
        }
      })
    }, OnShow() {
      dispatch({
        type: 'role/queryGroup',
        payload: { companyId: "63948D7B-8F29-4BFE-9C61-78893EB2C57D" }
      })
    }, ShowSelect() {
      dispatch({
        type: 'role/showModal',
        payload: {
          modalType: 'employee'
        }
      })
    },
    loadTree(ParentId, roleId) {
      dispatch({
        type: `role/getTree`,
        payload: { ParentId: ParentId, companyId: "1B9B83BA-4E97-4C72-8832-BD28CC152E4A", roleId: roleId }
      })
    },
    removeRoleEmployee(employeeId, roledId) {
      dispatch({
        type: 'role/removeRoleEmployee',
        payload: { RelationEmployeeRoleListActionRequests: [{ RoleId: roledId, EmployeeId: employeeId }] }
      })
    }
  }

  // const RoleModalGen = () =>
  //   <RoleModal {...roleModalProps} />;

  return (
    <div>
      <UserList {...ListProps} />
      <RoleModal {...roleModalProps} />
    </div>
  );
}

//监听属性，建立组件和数据的映射关系
function mapStateToProps({ loading, role }) {
  return { role, loading: loading.models.role };
}
//关联model
export default connect(mapStateToProps)(Role);
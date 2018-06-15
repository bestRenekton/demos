import React, { Component } from 'react';
import PropTypes from 'prop-types';
// 采用antd的UI组件
import { Table, message, Popconfirm, Pagination, Row, Col, List, Button, Modal, Input, Icon,Collapse,Card   } from 'antd';
import config from '../../utils/config';
import { debug } from 'util';
import styles from './List.css';
import com from '../../utils/com'


const Panel = Collapse.Panel;

// 采用 stateless 的写法

class UserList extends React.Component {
  componentDidMount() {
    this.props.Init();
  }
  constructor(props) {
    super(props)
  }
  componentWillReceiveProps(nextProps) {
    //debugger
    // if (this.state.status) {
    //   this.setState({
    //     dataSource: nextProps.dataSource
    //   });
    // }
  }

  //
  state = {
    visible: false,
    confirmLoading: false,
    text: "",
    groupVisible: false,
    groupConfirmLoading: false,
    groupText: "",
    dataSource :[],
    roleId:""
  }

  //点击角色
  clickRow=(item,groupId)=>{
    if(groupId!=undefined){
      this.setState({roleId:item});
      this.props.InitEmployee(1,item);
    }    
  }
  
  //编辑/删除
  onCellChange = (key, text,groupId, type) => { 
    if (type == 'delete') {
      this.props.onDelete(key,groupId);
    } else {         
      this.props.onEditItem(key,text,groupId);
    };
  }

  //移出
  onDelete = (key) => {     
      this.props.removeRoleEmployee(key,this.state.roleId);
  }

  //分页跳转
  onPageChange=(pageSize,pageNumber)=> {
    this.props.InitEmployee(pageSize,this.state.roleId);
  }

  //点击新增人员
  clickAddEmp = () => {
    if (this.state.roleId == undefined || this.state.roleId == '') {
      message.error("请先选择角色!");
    }else{
      this.props.loadTree('00000000-0000-0000-0000-000000000000',this.state.roleId)
    }
  }

  render() {    
    const { visible, confirmLoading,dataSource,groupVisible, groupConfirmLoading,total } = this.props;
    const columns = [{
      title: '姓名',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: '部门',
      dataIndex: 'Department',
      key: 'Department',
    }, {
      title: '操作',
      dataIndex: '',
      render: (text, record) => {
        return (
          dataSource.length > 1 ?
          (
            <Popconfirm title="确定移除吗?" cancelText="取消" okText="确定"  onConfirm={() => this.onDelete(record.Id)}>
              <a href="#">移除</a>
            </Popconfirm>
          ) : null
        );
      }
    }]
    const roleList =(group,role)=>{
      if(role==null) return;
      return (        
        role.map((item, index) => (          
          <div key={item.Id} className={this.state.roleId ===item.Id ?styles['roleTitle-select'] : styles['roleTitle']}>
              <EditableCell 
                value={item.Name}
                skey = {item.Id}
                editable = {item.editable}
                groupId ={group.Id}
                onChange={this.onCellChange}
                onClick={this.clickRow}
              />
          </div>
         ))
        )
    }
    
    const roleGroupList = dataSource && dataSource.length > 0
      ? dataSource.map((item, index) => (
        <Collapse key={item.Id}>
          <Panel header={<EditableCell value={item.Name} skey = {item.Id} 
              onChange={this.onCellChange}
              editable = {item.editable}
              onClick={this.clickRow}/>} key={item.Id}>
              {roleList(item,item.RoleItems)}
          </Panel>
        </Collapse>
      )) :
    <div style={{ padding: 20, display: "flex" }}>
        <div>暂无数据...</div>
    </div>

    
    
    const paginationProps ={
      total : total,
      pageSize: config.pageSize,
      onChange :this.onPageChange
    }
    return (
      <div>
        <Row>
          <Col span="6">
            <div >
              <Button type="primary" className={styles['addGroupbtn']} ghost={true} onClick={this.props.OnAddShow}>新增角色组</Button>
              <Button type="primary" className={styles['addbtn']} ghost={true} onClick={this.props.OnShow}>新增角色</Button>
            </div> 
            <div style={{height: "500px",  overflow: "auto",  overflowX: "hidden"}}>
              {roleGroupList}
            </div>       
            
          </Col>
          <Col span="17" style={{ marginLeft: "20px" }}>
            <div >              
              <Button type="primary" className={styles['addEmp']} ghost={true} onClick={() => this.clickAddEmp()}>添加成员</Button>
            </div> 
            <Table
              size="middle"
              bordered
              columns={columns}
              dataSource={this.props.userData}
              loading={this.props.userLoading}
              rowKey={record => record.Id}
              pagination={paginationProps}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

class EditableCell extends React.Component {

  componentWillReceiveProps(nextProps)
  {        
    this.setState({editable: nextProps.editable});     
  }

  state = {
    skey:this.props.skey,
    value: this.props.value,
    editable: this.props.editable,
    groupId :this.props.groupId
  }
  handleChange = (e) => {    
    const value = e.target.value;
    this.setState({ value });
  }
  check = (e) => {
    // this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.skey,this.state.value,this.state.groupId,'edit');
    }
    e.stopPropagation();
  }
  edit = (e) => {
    this.setState({ editable: true });
    e.stopPropagation();
  }
  onDelete = () => {
    if(this.props.onChange) {
      this.props.onChange(this.state.skey,this.state.value,this.state.groupId,'delete');
    }
  }
  render() {
    const { value, editable,skey,groupId } = this.state;    
    
    return (
      <div className={styles['editable-cell']}>
        {
          editable ?
            <div className={styles['editable-cell-input-wrapper']}>
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
                onClick={(e)=>e.stopPropagation()}
              />
              <Icon
                type="check"
                className={styles['editable-cell-icon-check']}
                onClick={this.check}
              />
            </div>
            :
            <div className={styles['editable-cell-text-wrapper']}>
              <div style={{display: "inline-block",width: "200px"}} onClick={()=>this.props.onClick(skey,groupId)}> {value || ' '}</div>
              <Icon
                type="edit"
                className={styles['editable-cell-icon']}
                onClick={this.edit}
                style={{ marginRight: 30 }}
              />
              <Popconfirm title="确定删除吗?" cancelText="取消" okText="确定" onConfirm={() => this.onDelete()}>
                <Icon
                  type="delete"
                  className={styles['editable-cell-icon']}
                />  
              </Popconfirm>
            </div>
        }
      </div>
    );
  }
}


UserList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onAdd: PropTypes.func,
}
export default UserList;
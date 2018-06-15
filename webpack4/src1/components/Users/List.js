import React, { Component, PropTypes } from 'react';

// 采用antd的UI组件
import { Table, Message, Popconfirm, Pagination } from 'antd';
import config from '../../utils/config';
// 采用 stateless 的写法

class UserList extends React.Component {
  componentDidMount() {
         this.props.Init();
    }
  constructor(props) {
         super(props)
    }
  render() {
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a >{text}</a>,
	},
     {
      title: '年龄',
      dataIndex: 'age',
      ley: 'age',

     }, 
     {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
     }, 
     {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <p>
          <a onClick={() => this.props.onEditItem(record)}>编辑</a>&nbsp;&nbsp;
           <Popconfirm title='确定要删嘛?' onConfirm={() => this.props.onDeleteItem(record.Id)}>
             <a>删除</a>
           </Popconfirm>
         </p>
     ),
     }
	]

	
	return (
      <div>
         <Table
             size="middle"
              bordered
             columns={columns}
             dataSource={this.props.dataSource}
             loading={this.props.loading}
          rowKey={record => record.Id}
            pagination={false}
         />
        

         <Pagination
         showQuickJumper 
        className="ant-table-pagination"
        total={this.props.total}
        current={this.props.current}
        pageSize={config.pageSize}
       onChange={this.props.onPageChange}
          />
      </div>
	)
    }
}


UserList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
}
export default UserList;
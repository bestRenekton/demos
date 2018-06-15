import React, { PropTypes } from 'react';
import { Tree, Modal, Card, Row, Col, Checkbox, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './main.less';
import config from '../../utils/config';
const TreeNode = Tree.TreeNode;
const CheckboxGroup = Checkbox.Group;

class SelectEmployee extends React.Component {
    state = {
        checkedList: [],
        empStateList:[],
        checkedNameList: []
    };

    componentWillMount() {
    }
    componentWillReceiveProps(nextProps)
    {        
        var ll = nextProps.empList.concat(this.state.empStateList);
        ll =  Array.from(new Set(ll));
        this.setState({empStateList:ll});        
    }
    constructor(props) {
        super(props)
    }

    handelOk = () => {
        this.props.onAddEmp(this.state.checkedList, this.props.roleId);
    }
    onCancel = () => {
        this.setState({checkedNameList:[],checkedList:[]});
    }

    //异步加载数据
    onLoadData = (treeNode) => {
        return new Promise((resolve) => {
            if (treeNode.props.children) {
                resolve();
                return;
            } else {
                this.props.loadTree(treeNode.props.Id, treeNode.props.pos);
            }
            setTimeout(() => {
                resolve();
                return;
            }, 500);
        });
    }
    renderTreeNodes = (data) => {
        if (data == null) return null;
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.Name} key={item.Id} >
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.Name} key={item.Id} {...item} />;
        });
    }

    //点击部门,获取人员
    onSelect = (selectedKeys, info) => {
        this.props.getEmployeeByOrg(info.node.props.eventKey);
    }

    //选择人员
    onChange = (checkedValues) => {
        var list = [];
        checkedValues.forEach(element => {
            var emp = this.state.empStateList.find(item => item.Id === element);
            list.push({ Id: emp.Id, Name: emp.Name });
        });
        this.setState({ checkedList: checkedValues,checkedNameList :list});
    }
    deleteClick=(emp)=>{
        var list = this.state.checkedNameList;
        var chList = this.state.checkedList;
        var index = list.findIndex(item => item.Id == emp.Id);
        list.splice(index, 1);
        chList.splice(chList.findIndex(item => item === emp.Id), 1);
        this.setState({checkedNameList: list,checkedList:chList });
    }

    render() {
        const { visible, groupVisible, item = {}, onOk, onAddRole, onCancel, type, orgList, empList, roleId } = this.props;
        const checkedNameList = this.state.checkedNameList;
        const liStyle = {
            display: "inline-block", lineHeight: "30px", margin: "5px 0 0 5px", padding: "0 10px",
            borderRadius: "1px", background: "#F3F6FC"
        }
        const modalOpts = {
            title: '选择成员',
            visible: visible,
            onOk: this.handelOk,
            onCancel,
            okText: "确认",
            cancelText: "取消",
            width: "600px",
            afterClose:this.onCancel,	
        }

        //人员选择列表
        const employeeList = empList != undefined && empList.length > 0
            ? empList.map((item, index) => (
                <Col span={24} key={item.Id}><Checkbox checked={this.state.checkedList.includes(item.Id)} value={item.Id}>{item.Name}</Checkbox></Col>
            ))
            :
            <div style={{ padding: 20, display: "flex" }}>
                <div>暂无数据...</div>
            </div>

        //已选择人员
        const checkListHtml = checkedNameList != undefined && checkedNameList.length > 0
            ? checkedNameList.map((item, index) => (
                <li style={liStyle} key={item.Id}><span>{item.Name}</span>
                    <Icon type="close" onClick={()=>this.deleteClick(item)}/>
                </li>
            )) : ""


        return (
            <Modal {...modalOpts} >

                <ul style={{ border: "1px solid #e8e8e8", minHeight: "80px", padding: "1px" }} >
                    {checkListHtml}
                </ul>

                <Row style={{ marginTop: "10px" }}>
                    <Col span={12}>
                        <div style={{ height: "300px", overflowX: 'hidden', overflowY: 'auto', border: '1px solid #e8e8e8' }}>
                            <Tree loadData={this.onLoadData} onSelect={this.onSelect}>
                                {this.renderTreeNodes(orgList)}
                            </Tree>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div style={{
                            height: "300px", overflowX: 'hidden', overflowY: 'auto',
                            border: '1px solid #e8e8e8', paddingLeft: '30px'
                        }}>
                            <CheckboxGroup style={{ width: '100%' }} onChange={this.onChange} 
                                value={this.state.checkedList}>
                                <Row>
                                    {employeeList}
                                </Row>
                            </CheckboxGroup>
                        </div>
                    </Col>
                </Row>
            </Modal>

        )
    }
}
export default SelectEmployee;


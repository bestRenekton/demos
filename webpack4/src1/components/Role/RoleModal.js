import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal, Select, message } from 'antd';
import SelectEmp from '../../components/Layout/SelectEmployee';

const FormItem = Form.Item;
const Option = Select.Option;

class RoleModal extends React.Component {

	state = {
		text: '',
		selectType: ''
	}
	onTextChange = (e) => {
		this.setState({ text: e.target.value });
	}
	handleChange = (value) => {
		this.setState({ selectType: value });

	}
	handelOk = () => {
		if (this.props.type == "group") {
			this.props.onOk(this.state.text);
		}
		else
			this.props.onAddRole(this.state.text, this.state.selectType);
	}

	loadTree = (Id, pos) => {
		this.props.loadTree(Id, pos);
	}
	getEmployeeByOrg = (Id, pos) => {
		this.props.getEmployeeByOrg(Id, pos);
	}
	onAddEmp = (SelectEmp, roleId) => {
		this.props.onAddEmp(SelectEmp, roleId);
	}

	render() {
		const { visible, groupVisible, item = {}, onOk, onAddRole, onCancel, type, groupList, orgList, empList, roleId ,onAddEmp} = this.props;

		const modalOpts = {
			title: type == "group" ? '新增角色组' : '新增角色',
			visible: visible,
			onOk: this.handelOk,
			onCancel,
			okText: "确认",
			cancelText: "取消"
		}
		const options = groupList.map(d => <Option key={d.Id}>{d.Name}</Option>);
		const SelectProps = {
			visible: visible,
			onCancel,
			orgList: orgList,
			roleId: roleId,
			empList: empList,
			loadTree: this.loadTree,
			getEmployeeByOrg: this.getEmployeeByOrg,
			onAddEmp: onAddEmp
		}
		switch (type) {
			case 'group':
				return (<Modal {...modalOpts}>
					{
						<Input placeholder="请输入角色组名称" onChange={this.onTextChange} />
					}
				</Modal>)
			case 'role':
				return (<Modal {...modalOpts}>
					{

						<div>
							<div style={{ display: "flex" }}>
								<p style={{ width: "25%" }}>角色名称: </p>
								<Input placeholder="请输入角色名称" onChange={this.onTextChange} />
							</div>
							<div style={{ display: "flex", marginTop: "20px" }}>
								<p style={{ width: "20%" }}>分组到:</p>
								<Select style={{ width: 250 }} onChange={this.handleChange}>
									{options}
								</Select>
							</div>
						</div>
					}
				</Modal>)
			case 'employee':
				return (
					<SelectEmp {...SelectProps}>
					</SelectEmp>)
		}
		// return (
		// 	<div>
		// 		<Modal {...modalOpts}>
		// 			{
		// 				type == "group" ?
		// 					<Input placeholder="请输入角色组名称" onChange={this.onTextChange} />
		// 					:
		// 					<div>
		// 						<div style={{ display: "flex" }}>
		// 							<p style={{ width: "25%" }}>角色名称: </p>
		// 							<Input placeholder="请输入角色名称" onChange={this.onTextChange} />
		// 						</div>
		// 						<div style={{ display: "flex", marginTop: "20px" }}>
		// 							<p style={{ width: "20%" }}>分组到:</p>
		// 							<Select style={{ width: 250 }} onChange={this.handleChange}>
		// 								{options}
		// 							</Select>
		// 						</div>
		// 					</div>
		// 			}
		// 		</Modal>
		// 	</div>
		// )
	}

}
RoleModal.propTypes = {
	visible: PropTypes.any,
	onCancel: PropTypes.func,
	groupList: PropTypes.any,
}
//export default Form.create()(RoleModal);
export default RoleModal;
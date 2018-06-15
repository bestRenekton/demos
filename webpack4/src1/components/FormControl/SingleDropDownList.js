import React from 'react';
import { connect } from 'dva';
import { Select } from 'antd';
import styles from './Attribute.less'
import com from '../../utils/com'
import CommomCtrol from './CommomCtrol.js'
import Title from '../../components/FormControl/Attribute/Title.js'
import Desc from '../../components/FormControl/Attribute/Desc.js'
import Verification from '../../components/FormControl/Attribute/Verification.js'
import OperationPower from '../../components/FormControl/Attribute/OperationPower.js'
import DropDownItem from '../../components/FormControl/Attribute/DropDownItem.js'
const Option = Select.Option;
function initData() {
    let FormJson = new com.FormJson()
    FormJson.Type = "SingleDropDownList";
    FormJson.TypeName = "下拉列表";
    FormJson.Text = "下拉列表";//标题
    FormJson.dropdownList = ["选项1", "选项2", "选项3"];
    FormJson.selectIndex = -1;
    return FormJson;
}
@CommomCtrol()
class SingleDropDownListMiddel extends React.Component {
    handleChange(value) {
        this.props.setValue(this.props.index, value);
    }
    render() {
        let options = this.props.dropdownList.map((p, index) => {
            return <Option key={p} value={index.toString()}>{p}</Option>
        });
        return (<Select style={{ width: 240 }} onChange={this.handleChange.bind(this)} value={this.props.itemValue > this.props.dropdownList.length ? 0 : this.props.itemValue}>
            {options}
        </Select>)
    }
}

class SingleDropDownList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { mode, ...data } = this.props;
        switch (mode) {
            case 'middle':
                return <SingleDropDownListMiddel {...this.props} />;
            case 'right':
                return (
                    <div className={styles.ControllAttrWrapper}>
                        <Title {...this.props} />
                        <Desc {...this.props} />
                        <DropDownItem {...this.props} />
                        <Verification {...this.props} />
                        <OperationPower {...this.props} />
                    </div>)
            default:
                return <div>控件加载失败</div>;
        }
    }
}
export default {
    key: "SingleDropDownList",
    name: "下拉列表",
    ico: 'contacts',
    Component: connect()(SingleDropDownList),
    Data: initData
};
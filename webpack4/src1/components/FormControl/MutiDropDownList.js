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
import MutiDropDownItem from '../../components/FormControl/Attribute/MutiDropDownItem.js'
const Option = Select.Option;
function initData() {
    let FormJson = new com.FormJson()
    FormJson.Type = "MutiDropDownList";
    FormJson.TypeName = "复选下拉列表";
    FormJson.Text = "复选下拉列表";//标题
    FormJson.dropdownList = ["选项1", "选项2", "选项3"];
    return FormJson;
}
@CommomCtrol()
class MutiDropDownListMiddel extends React.Component {
    handleChange(value) {
        this.props.setValue(this.props.index, value.toString());
    }
    render() {
        let options = this.props.dropdownList.map((p, index) => {
            return <Option key={p} value={index.toString()}>{p}</Option>
        });
        return (<Select mode="multiple" style={{ width: '100%' }} onChange={this.handleChange.bind(this)} value={this.props.itemValue ? this.props.itemValue.split(',') : []}>
            {options}
        </Select>)
    }
}

class MutiDropDownList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { mode, ...data } = this.props;
        switch (mode) {
            case 'middle':
                return <MutiDropDownListMiddel {...this.props} />;
            case 'right':
                return (
                    <div className={styles.ControllAttrWrapper}>
                        <Title {...this.props} />
                        <Desc {...this.props} />
                        <MutiDropDownItem {...this.props} />
                        <Verification {...this.props} />
                        <OperationPower {...this.props} />
                    </div>)
            default:
                return <div>控件加载失败</div>;
        }
    }
}
export default {
    key: "MutiDropDownList",
    name: "复选下拉列表",
    ico: 'contacts',
    Component: connect()(MutiDropDownList),
    Data: initData
};
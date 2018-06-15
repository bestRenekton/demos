import React from 'react';
import { connect } from 'dva';
import { Checkbox, InputNumber, Button, Switch, Select } from 'antd';
import com from '../../utils/com';
import CommomCtrol from './CommomCtrol.js';
import Title from '../../components/FormControl/Attribute/Title.js';
import Desc from '../../components/FormControl/Attribute/Desc.js';
import Verification from '../../components/FormControl/Attribute/VerificationNum.js';
import OperationPower from '../../components/FormControl/Attribute/OperationPower.js';
import DefaultValue from '../../components/FormControl/Attribute/DefaultValue.js';
import { getDataLinkValue } from '../FormControl/DataLinker/DataLinker';
function initData() {
    let FormJson = new com.FormJson()
    FormJson.Type = "Number";
    FormJson.TypeName = "数字";
    FormJson.Text = "数字";//标题
    FormJson.Decimal = true;//标题
    return FormJson;
}
@CommomCtrol()
class NumberMiddel extends React.Component {
    SetDefaultValue(e) {
        this.props.setValue(this.props.index, e);
    }

    render() {
        var { ...data } = this.props;
        return (<InputNumber value={getDataLinkValue(this.props, parseFloat)} onChange={ele => this.SetDefaultValue(ele)} />)
    }
}
class Number extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { mode, ...data } = this.props;
        switch (mode) {
            case 'middle':
                return <NumberMiddel {...this.props} />;
            case 'right':
                return (
                    <div>
                        <Title {...this.props} />
                        <Desc {...this.props} />
                        <DefaultValue {...this.props} />
                        <Verification {...this.props} />
                        <OperationPower {...this.props} />
                    </div>)
            default:
                return <div>控件加载失败</div>;
        }
    }
}
export default {
    key: "Number",
    name: "数字",
    ico: 'contacts',
    Component: connect()(Number),
    Data: initData
};
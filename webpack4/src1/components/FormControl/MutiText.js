import React from 'react';
import { connect } from 'dva';
import { Checkbox, Input, Button, Switch, Select } from 'antd';
import com from '../../utils/com'
import CommomCtrol from './CommomCtrol.js'
import Title from '../../components/FormControl/Attribute/Title.js'
import Desc from '../../components/FormControl/Attribute/Desc.js'
import Verification from '../../components/FormControl/Attribute/Verification.js'
import OperationPower from '../../components/FormControl/Attribute/OperationPower.js'
import Formart from '../../components/FormControl/Attribute/Formart.js'
import DefaultValueMuti from '../../components/FormControl/Attribute/DefaultValueMuti'
import { fromJS } from 'immutable';

function initData() {
    let FormJson = new com.FormJson()
    FormJson.Type = "MutiText";
    FormJson.TypeName = "多行文本"
    FormJson.Text = "多行文本";//标题
    return FormJson;
}
@CommomCtrol()
class MutiTextMiddel extends React.Component {
    SetDefaultValue(e) {
        this.props.setValue(this.props.index, e.target.value);
    }
    render() {
        var { ...data } = this.props;
        return (<Input.TextArea value={this.props.isPreview ? (this.props.itemValue == undefined ? data.DataLinkValue : this.props.itemValue) : data.DataLinkValue} onChange={e => this.SetDefaultValue(e)} style={{ resize: "none" }} />)
    }
}
class MutiText extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { mode, ...data } = this.props;
        switch (mode) {
            case 'middle':
                return <MutiTextMiddel {...this.props} />
            case 'right':
                return (
                    <div >
                        <Title {...this.props} />
                        <Desc {...this.props} />
                        <DefaultValueMuti {...this.props} />
                        <Verification {...this.props} />
                        <OperationPower {...this.props} />
                    </div>)
            default:
                return <div>控件加载失败</div>;
        }
    }
}
export default {
    key: "MutiText",
    name: "多行文本",
    ico: 'contacts',
    Component: connect()(MutiText),
    Data: initData
};
import React from 'react';
import { connect } from 'dva';
import { Input, Button } from 'antd';
import com from '../../utils/com';
import CommomCtrol from './CommomCtrol.js';
import Title from '../../components/FormControl/Attribute/Title.js';
import Desc from '../../components/FormControl/Attribute/Desc.js';
import Verification from '../../components/FormControl/Attribute/Verification.js';
import OperationPower from '../../components/FormControl/Attribute/OperationPower.js';
import Formart from '../../components/FormControl/Attribute/Formart.js';
import DefaultValue from '../../components/FormControl/Attribute/DefaultValue.js';
import { getDataLinkValue } from '../FormControl/DataLinker/DataLinker';


function initData() {
    let FormJson = new com.FormJson()
    FormJson.Type = "SingleText";
    FormJson.TypeName = "单行文本";
    FormJson.Text = "单行文本";//标题
    FormJson.list = [{ Text: "te", Value: 1 }, { Text: "te2323", Value: 2 }];
    return FormJson;
}
@CommomCtrol()
class SingleTextMiddel extends React.Component {
    SetValue(e) {
        this.props.setValue(this.props.index, e.target.value);
    }
    render() {
        return (
            <div>
                <Input value={getDataLinkValue(this.props)} onChange={ele => this.SetValue(ele)} />
            </div>
        )
    }
}
class SingleText extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { mode, ...data } = this.props;
        switch (mode) {
            case 'middle':
                return <SingleTextMiddel {...this.props} />;
            case 'right':
                return (
                    <div>
                        <Title {...this.props} />
                        <Desc {...this.props} />
                        <DefaultValue {...this.props} />
                        <Verification {...this.props} />
                        <OperationPower {...this.props} />
                        <Formart {...this.props} />
                    </div>)
            default:
                return <div>控件加载失败</div>;
        }
    }
}
export default {
    key: "SingleText",
    name: "单行文本",
    ico: 'contacts',
    Component: connect()(SingleText),
    Data: initData
};
import React from 'react';
import { connect } from 'dva';
import { Checkbox, Input, Button, Switch, Select, DatePicker } from 'antd';
import moment from 'moment';
import com from '../../utils/com'
import CommomCtrol from './CommomCtrol.js'
import Title from '../../components/FormControl/Attribute/Title.js'
import Desc from '../../components/FormControl/Attribute/Desc.js'
import Type from '../../components/FormControl/Attribute/DateType.js'
import Verification from '../../components/FormControl/Attribute/Verification.js'
import OperationPower from '../../components/FormControl/Attribute/OperationPower.js'
import DefaultValue from '../../components/FormControl/Attribute/DefaultValueDate.js'

function initData() {
    let FormJson = new com.FormJson()
    FormJson.Type = "DateTime";
    FormJson.TypeName = "日期时间";
    FormJson.Text = "日期时间";//标题
    FormJson.DateType = "Date";//默认值格式
    return FormJson;
}
const dateFormat = "YYYY-MM-DD";
@CommomCtrol()
class DateTimeMiddel extends React.Component {
    SetDefaultValue(e) {
        this.props.setValue(this.props.index, e);
    }
    render() {
        var { ...data } = this.props;
        var ss = moment(this.props.itemValue ? this.props.itemValue : data.DataLinkValue || new Date(), dateFormat);
        return (<DatePicker showTime={data.DateType == "DateTime"} value={ss}
            format={data.DateType == "DateTime" ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"}
            onChange={e => this.SetDefaultValue(e)} />)
    }
}
class DateTime extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { mode, ...data } = this.props;
        switch (mode) {
            case 'middle':
                return <DateTimeMiddel {...this.props} />;
            case 'right':
                return (
                    <div>
                        <Title {...this.props} />
                        <Desc {...this.props} />
                        <Type {...this.props} />
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
    key: "DateTime",
    name: "日期时间",
    ico: 'contacts',
    Component: connect()(DateTime),
    Data: initData
};
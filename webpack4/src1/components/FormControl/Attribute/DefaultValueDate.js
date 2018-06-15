import { Input, Button, Select, DatePicker } from 'antd';
import Attribute from './Attribute.js'
import moment from 'moment';
import { LINKTYPE } from '../DataLinker/DataLinker';

@Attribute('默认值')
class DefaultValueDate extends React.Component {
    componentDidMount() {
    } constructor(props) {
        super(props);
        this.SetDefaultValue = this.SetDefaultValue.bind(this);
        this.SetModeChange = this.SetModeChange.bind(this);
    }
    SetModeChange(e) {
        this.setData({ DataLinkType: e });
    }
    SetDefaultValue(e) {
        this.setData({ DataLinkValue: e });
    }
    setData(data) {
        this.props.dispatch({
            type: 'formBuilder/setData',
            index: this.props.index,
            Data: { ...data }
        });
    }
    render() {
        let { ...data } = this.props;
        var current;
        switch (data.DataLinkType) {
            case LINKTYPE.Custom:
                current = <DatePicker style={{ width: "100%" }} showTime={data.DateType == "DateTime"}
                    format={data.DateType == "DateTime" ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"}
                    onChange={e => this.SetDefaultValue(e)} />
                break;
            case LINKTYPE.Linker:
                current = <Button style={{ width: "100%" }}>数据联动设置</Button>
                break;
            case LINKTYPE.Formula:
                current = <Button style={{ width: "100%" }}>fx 编辑公式</Button>
                break;
            default:
                break;
        }

        return (<div>
            <Select value={data.DataLinkType} style={{ width: "100%" }} onChange={e => this.SetModeChange(e)}>
                <Select.Option value={LINKTYPE.Custom}>自定义</Select.Option>
                <Select.Option value={LINKTYPE.Linker}>数据联动</Select.Option>
                <Select.Option value={LINKTYPE.Formula}>公式编辑</Select.Option>
            </Select>
            <div style={{ height: "5px" }}></div>
            {current}
        </div>);

    }
}
export default DefaultValueDate;
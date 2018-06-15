import { Checkbox, Input, Button, Switch, Select } from 'antd';
import Attribute from './Attribute.js'

@Attribute('操作权限')
class OperationPower extends React.Component {
    componentDidMount() {
    } constructor(props) {
        super(props);
        this.SetSwitch = this.SetSwitch.bind(this);
    }
    SetSwitch(type, e) {
        var prop = {};
        prop[type] = e;
        this.props.dispatch({
            type: 'formBuilder/setData',
            index: this.props.index,
            Data: { ...prop }
        });
    }
    render() {
        let { ...data } = this.props;
        return (<div>
            <div><Switch checked={data.Visible} onChange={e => this.SetSwitch("Visible", e)} />&nbsp;可见</div>
            <div style={{ marginTop: "5px" }}><Switch checked={data.Editable} onChange={e => this.SetSwitch("Editable", e)} />&nbsp;可编辑</div>
        </div>);

    }
}
export default OperationPower;
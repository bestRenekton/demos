import { Checkbox, Input, Button, Switch, Select } from 'antd';
import Attribute from './Attribute.js'

@Attribute('校验')
class VerificationNum extends React.Component {
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
            <div><Switch checked={data.Required} onChange={e => this.SetSwitch("Required", e)} />&nbsp;必填</div>
            <div style={{ marginTop: "5px" }}><Switch checked={data.Decimal} onChange={e => this.SetSwitch("Decimal", e)} />&nbsp;允许小数</div>
        </div>);

    }
}
export default VerificationNum;
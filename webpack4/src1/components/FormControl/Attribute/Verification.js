import { Checkbox, Input, Button, Switch, Select } from 'antd';
import Attribute from './Attribute.js'

@Attribute('校验')
class Verification extends React.Component {
    componentDidMount() {
    } constructor(props) {
        super(props);
        this.SetSwitch = this.SetSwitch.bind(this);
    }
    SetSwitch(type,e) {
        var prop = {};
        prop[type] = e;
        debugger
        this.props.dispatch({
            type: 'formBuilder/setData',
            index: this.props.index,
            Data: { ...prop }
        });
    }
    render() {
        let {...data } = this.props;
        return (<div>
           <Switch checked={data.Required} onChange={e => this.SetSwitch("Required", e)} />&nbsp;必填
        </div>);
        
    }
}
export default Verification;
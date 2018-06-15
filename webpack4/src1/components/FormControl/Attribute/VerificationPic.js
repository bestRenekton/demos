import { Checkbox, Input, Button, Switch, Select } from 'antd';
import Attribute from './Attribute.js'

@Attribute('校验')
class VerificationPic extends React.Component {
    componentDidMount() {
    } constructor(props) {
        super(props);
        this.SetSwitch = this.SetSwitch.bind(this);
    }
    SetSwitch(type,e) {
        var prop = {};
        prop[type] = e;
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
           <br />
            <div style={{ height: "5px" }}></div>
            <Switch checked={data.Multiple} onChange={e => this.SetSwitch("Multiple", e)} />&nbsp;{this.props.Type=='Picture'?"允许上传多张图片":"允许多文件上传"}
        </div>);
        
    }
}
export default VerificationPic;
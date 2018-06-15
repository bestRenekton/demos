import { Checkbox, Input, Button, Switch, Select } from 'antd';
import Attribute from './Attribute.js'
import com from '../../../utils/com'
@Attribute('格式')
class Formart extends React.Component {
    componentDidMount() {
    } constructor(props) {
        super(props);
        this.SetFormart = this.SetFormart.bind(this);
    }
     SetFormart(type) {
        
        var formart = com.ControlFormart(type);
        this.props.dispatch({
            type: 'formBuilder/setData',
            index: this.props.index,
            Data: { FormartValue: formart, FormartText: type }
        });
    }
    render() {
        let {...data } = this.props;
        return (<div>
             <Select value={data.FormartText} style={{ width: "100%" }} onChange={e => this.SetFormart(e)}>
                                    <Option value="none">无</Option>
                                    <Option value="Mobile">手机号码</Option>
                                    <Option value="IdCard">身份证号码</Option>
                                    <Option value="PostalCode">邮政编码</Option>
                                    <Option value="Email">邮箱</Option>
             </Select>
        </div>);

    }
}
export default Formart;
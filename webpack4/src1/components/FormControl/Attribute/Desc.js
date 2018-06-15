import { Checkbox, Input, Button, Switch, Select } from 'antd';
import Attribute from './Attribute.js'

@Attribute('描述信息')
class Desc extends React.Component {
    componentDidMount() {
    } constructor(props) {
        super(props);
        this.DescInputChange = this.DescInputChange.bind(this);
    }
    DescInputChange(e) {
        this.props.dispatch({
            type: 'formBuilder/setData',
            index: this.props.index,
            Data: { Desc: e.target.value }
        });
    }
    render() {
        let {...data } = this.props;
        return (<Input.TextArea style={{resize:"none"}} value={data.Desc} onChange={ele => this.DescInputChange(ele)} />);
    }
}
export default Desc;
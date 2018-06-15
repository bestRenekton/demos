import { Input, Button, } from 'antd';
import Attribute from './Attribute.js'
/*多文本默认值*/
@Attribute('默认值')
class DefaultValueMuti extends React.Component {
    componentDidMount() {
    } constructor(props) {
        super(props);
        this.SetDefaultValue = this.SetDefaultValue.bind(this);
    }
    SetDefaultValue(e) {
        this.props.dispatch({
            type: 'formBuilder/setData',
            index: this.props.index,
            Data: { DataLinkValue: e.target.value }
        });
    }
    render() {
        let { ...data } = this.props;
        return (<div>
            <Input.TextArea value={data.DataLinkValue} style={{ resize: "none" }} onChange={e => this.SetDefaultValue(e)} />
        </div>);
    }
}
export default DefaultValueMuti;
import { Checkbox, Input, Button, Switch, Select } from 'antd';
import Attribute from './Attribute.js'
import com from '../../../utils/com'

@Attribute('类型')


class DateType extends React.Component {
    componentDidMount() {
    } constructor(props) {
        super(props);
        this.SetDateType = this.SetDateType.bind(this);
    }
    SetDateType(type) {
        this.props.dispatch({
            type: 'formBuilder/setData',
            index: this.props.index,
            Data: { DateType: type }
        });
    }
    render() {
        let { ...data } = this.props;
        return (<div>
            <Select value={data.DateType} style={{ width: "100%" }} onChange={e => this.SetDateType(e)}>
                <Option value="Date">日期</Option>
                <Option value="DateTime">日期时间</Option>
            </Select>
        </div>);

    }
}
export default DateType;
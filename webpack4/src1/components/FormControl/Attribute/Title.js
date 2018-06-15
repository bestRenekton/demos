import { Checkbox, Input, Button, Switch, Select } from 'antd';
import Attribute from './Attribute.js'
import { connect } from 'dva';

@Attribute('标题',true)
class Title extends React.Component {
    componentDidMount() {
    } constructor(props) {
        super(props);
        this.TitleInputChange = this.TitleInputChange.bind(this);
    }
    TitleInputChange(e) {
        this.props.dispatch({
            type: 'formBuilder/setData',
            index: this.props.index,
            Data: { Text: e.target.value }
        });
    }
    render() {
        let {...data } = this.props;
        return (<Input value={data.Text} onChange={ele => this.TitleInputChange(ele)} />);
    }
}
export default Title;
import { Input, Select, Icon, Row, Col, Modal, Tooltip, Popconfirm } from 'antd';
import Attribute from './Attribute.js'
import { connect } from 'dva';
import com from '../../../utils/com';
import FormStatus from '../../../models/FormBuilder/FormStatus';

const { TextArea } = Input;

@Attribute('标签项')
class TabItems extends React.Component {
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        this.changeInput = this.changeInput.bind(this);
    }
    addItem() {
        let newTabs = Array.from(this.props.TabKeys);
        newTabs.push({ title: '标签页', key: com.Guid(), FormId: com.Guid(), status: FormStatus.Add });
        this.rightDispatch(newTabs);
    }
    delItem(e) {
        debugger
        this.props.dispatch({
            type: 'formBuilder/removeTabItem',
            index: this.props.index,
            TabKey: e
        });
    }
    changeInput(e) {
        let newTabs = Array.from(this.props.TabKeys);
        newTabs[e.target.getAttribute("data-index")].title = e.target.value;
        if (newTabs[e.target.getAttribute("data-index")].status != FormStatus.Add)
            newTabs[e.target.getAttribute("data-index")].status = FormStatus.Modify;
        this.props.dispatch({
            type: 'formBuilder/setData',
            index: this.props.index,
            Data: {
                TabKeys: newTabs
            }
        });
    }
    rightDispatch(newTabs) {
        this.props.dispatch({
            type: 'formBuilder/setData',
            index: this.props.index,
            Data: {
                TabKeys: newTabs
            }
        });
    }
    render() {
        return (
            <div>{
                this.props.TabKeys.map((p, index) => {
                    return <div key={index} style={{ marginTop: 5 }}>
                        <Input style={{ width: 220 }} data-index={index.toString()} value={p.title} onChange={this.changeInput} />
                        {index > 0 ?
                            <Popconfirm title='容器内的控件也会删除，确定要删吗?' onConfirm={this.delItem.bind(this, p.key)}>
                                <Icon type="minus-circle-o" style={{ marginLeft: "5px", fontSize: 16, color: 'red' }} />
                            </Popconfirm> : null}
                    </div>
                })}
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <a type="primary" onClick={this.addItem} style={{ color: '#0DB3A6' }}>新增</a>
                </div>
            </div>);
    }
}
export default TabItems;
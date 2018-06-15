import { Input, Button, Select, Modal, Row, Col } from 'antd';
import Attribute from './Attribute.js';
import FormulaEditor from '../FormulaEditor/FormulaEditor';
import { LINKTYPE,funcFix } from '../DataLinker/DataLinker';
import { debug } from 'util';
const Option = Select.Option;
@Attribute('默认值')
class DefaultValue extends React.Component {
    componentDidMount() {
    } constructor(props) {
        super(props);
        this.SetDefaultValue = this.SetDefaultValue.bind(this);
        this.SetModeChange = this.SetModeChange.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.setFormular = this.setFormular.bind(this);
        this.initFormula = this.initFormula.bind(this);
    }
    SetModeChange(e) {
        let parm = {};
        switch (e) {
            case LINKTYPE.Formula:
                parm = { DataLinkOptions: { relations: [] } }
                break;
            case LINKTYPE.Linker:
                parm = { DataLinkOptions: {} }
                break;
            case LINKTYPE.Custom:
                parm = { DataLinkOptions: {} }
                break;
            case LINKTYPE.Resource:
                parm = { DataLinkOptions: {} }
                break;
        }
        this.setData({ DataLinkType: e, ...parm, DataLinkValue: '' });
    }
    SetDefaultValue(e) {
        this.setData({ DataLinkValue: e.target.value });
    }
    showModal() {
        this.setData({ showModal: true });
    }
    hideModal() {
        this.setData({ showModal: false });
    }
    initFormula(editor, options, next) {
        this.setState({
            editor: editor
        });
    }
    setFormular() {
        let value = this.state.editor.getValue();
        let fixValue=funcFix(value);
        this.state.editor.setValue(fixValue);
        this.setData({
            DataLinkType: LINKTYPE.Formula,
            DataLinkValue: fixValue,
            DataLinkOptions: { relations: this.getRelations(fixValue) },
            showModal: false,
        });
    }
    getRelations(value) {
        let relations = [], sp = '\u2800';
        if (value.indexOf(sp) > -1) {
            let list = value.split(sp);
            list.map(function (item, index) {
                if (index % 2 == 1 && relations.indexOf(item) == -1) {
                    relations.push(item);
                }
            });
        };
        return relations;
    }
    setData(data) {
        this.props.dispatch({
            type: 'formBuilder/setData',
            index: this.props.index,
            Data: { ...data }
        });
    }
    render() {
        let { ...data } = this.props;
        let current, currentTitile;
        switch (data.DataLinkType) {
            case LINKTYPE.Custom:
                current = <Input value={data.DataLinkValue} style={{ resize: "none" }} onChange={e => this.SetDefaultValue(e)} />
                break;
            case LINKTYPE.Linker:
                current = <Button style={{ width: "100%" }}>数据联动设置</Button>
                currentTitile = '数据联动设置';
                break;
            case LINKTYPE.Formula:
                current = <Button style={{ width: "100%" }} onClick={this.showModal}>fx 编辑公式</Button>
                currentTitile = 'fx 编辑公式';
                break;
            default:
                break;

        }
        return (<div>
            <Select value={data.DataLinkType} style={{ width: "100%" }} onChange={e => this.SetModeChange(e)}>
                <Select.Option value={LINKTYPE.Custom}>自定义</Select.Option>
                <Select.Option value={LINKTYPE.Linker}>数据联动</Select.Option>
                <Select.Option value={LINKTYPE.Formula}>公式编辑</Select.Option>
            </Select>
            <div style={{ height: "5px" }}></div>
            {current}
            <Modal maskClosable={false} title={currentTitile} visible={this.props.showModal} onOk={this.setFormular} width={800} onCancel={this.hideModal}>
                <FormulaEditor index={data.index} dispatch={this.props.dispatch} value={this.props.DataLinkValue} 
                curFIL={data.curFIL} options={this.props.DataLinkOptions} init={this.initFormula}/>
            </Modal>
        </div>);
    }
}
export default DefaultValue;
import { Input, Checkbox, Select, Icon, Row, Col, Modal, Tooltip } from 'antd';
import Attribute from './Attribute.js'
import { connect } from 'dva';
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

@Attribute('下拉项')
class MutiDropDownItem extends React.Component {
  constructor(props) {
    super(props);
    this.changeInput = this.changeInput.bind(this);
    this.state = {
      dropdownList: this.props.dropdownList,
      selectValue: ""
    };
  }
  componentWillMount() {
    this.rightDispatch(["选项1", "选项2", "选项3"]);
  }
  addItem() {
    let newRadios = Array.from(this.props.dropdownList);
    newRadios.push("选项" + (newRadios.length + 1));
    this.rightDispatch(newRadios);
  }
  addAll() {
    this.setState({
      dropdownList: this.props.dropdownList
    });
    this.props.dispatch({
      type: 'formBuilder/setData',
      index: this.props.index,
      Data: {
        visible: true
      }
    });
  }
  closeModal() {
    this.props.dispatch({
      type: 'formBuilder/setData',
      index: this.props.index,
      Data: {
        visible: false
      }
    });
  }
  changeTextAreaValue(e) {
    var valListarray = e.target.value.split("\n")
    this.setState({
      dropdownList: valListarray
    });
    console.log(valListarray);
  }
  TextAreaOk() {
    var valListarray = this.refs.TextChange.props.value.split("\n")
    if (valListarray[valListarray.length - 1] === "") {
      valListarray.pop()
    }
    this.rightDispatch(valListarray);
    this.closeModal();
  }
  deleteItem(e) {
    let newRadios = Array.from(this.props.dropdownList);
    newRadios.splice(e.target.getAttribute("value"), 1)
    this.setState({
      radios: newRadios
    });
    this.rightDispatch(newRadios);
  }
  changeOption(e) {
    this.props.dispatch({
      type: 'formBuilder/setData',
      index: this.props.index,
      Data: {
        selectIndex: e
      }
    });
  }
  changeInput(e) {
    let newRadios = Array.from(this.props.dropdownList);
    newRadios[e.target.getAttribute("data-index")] = e.target.value;
    this.props.dispatch({
      type: 'formBuilder/setData',
      index: this.props.index,
      Data: {
        dropdownList: newRadios
      }
    });
  }
  rightDispatch(newRadios) {
    if (!newRadios) {
      newRadios = this.props.dropdownList
    }
    this.props.dispatch({
      type: 'formBuilder/setData',
      index: this.props.index,
      Data: {
        dropdownList: newRadios
      }
    });
  }
  render() {
    var ValList = ''
    if (this.state.dropdownList) {
      for (let i = 0; i < this.state.dropdownList.length; i++) {
        if (i == this.state.dropdownList.length - 1) {
          ValList += `${this.state.dropdownList[i]}`
        } else {
          ValList += `${this.state.dropdownList[i]}\n`
        }
      }
    }
    let { ...data } = this.props;
    let radios = this.props.dropdownList.map((p, index) => {
      return <div key={index} style={{ marginTop: 5 }}>
        <Checkbox value={index.toString()} ></Checkbox>
        <Input style={{ width: 220 }} data-index={index.toString()} value={p} defaultValue={p} onChange={this.changeInput} />
        <Icon type="minus-circle-o" value={index} style={{ marginLeft: "5px", fontSize: 16, color: 'red' }} onClick={this.deleteItem.bind(this)} />
        <Icon type="paper-clip" style={{ marginLeft: "5px", fontSize: 16, color: 'red' }} />
      </div>
    });
    return (
      <div>
        <CheckboxGroup onChange={this.changeOption.bind(this)}>
          {radios}
        </CheckboxGroup>
        <Row style={{ marginTop: '10px' }}>
          <Col span={8}></Col>
          <Col span={8}>
            <a type="primary" onClick={this.addItem.bind(this)} style={{ color: '#0DB3A6', marginRight: '2px' }}>新增</a>|
              <a type="primary" onClick={this.addAll.bind(this)} style={{ color: '#0DB3A6' }}>批量编辑</a>
          </Col>
          <Col span={8}></Col>
        </Row>
        <Modal
          title="批量编辑"
          visible={this.props.visible}
          onOk={this.TextAreaOk.bind(this)}
          onCancel={this.closeModal.bind(this)}
        >
          <TextArea style={{ border: "1px #E9E9E9 solid", padding: "10px 5px" }} ref="TextChange"
            autosize={true} onChange={this.changeTextAreaValue.bind(this)} value={ValList}
          >
          </TextArea>
        </Modal>
      </div>);
  }
}



export default MutiDropDownItem;
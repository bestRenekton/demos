import { Checkbox, Input, Button, Switch, Select, Radio, Icon, Modal, Tooltip, Row, Col, Form } from 'antd';
import Attribute from './Attribute.js'
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { TextArea } = Input;
var valListarray = null
var ValList = ''


@Attribute('选项')
class SelectionBox extends React.Component {
  componentDidMount() {
  }

  constructor(props) {
    super(props)
    this.newTabIndex = 4;//单选框默认显示的个数为3个
    this.OptionChange = this.OptionChange.bind(this);
    this.OptionsChange = this.OptionsChange.bind(this);
    this.add = this.add.bind(this);
    this.checkAdd = this.checkAdd.bind(this);
    this.InputChange = this.InputChange.bind(this)
    this.InputChanges = this.InputChanges.bind(this)
    this.Delete = this.Delete.bind(this)
    this.checkDelete = this.checkDelete.bind(this)
  }

  //单选框选中的值
  OptionChange(e) {
    this.props.dispatch({
      type: 'formBuilder/setData',
      index: this.props.index,
      Data: { checked: e.target.value }
    });
  }

  //多相框选中的值
  OptionsChange(checkedValues) {
    // console.log(checkedValues)
    this.props.dispatch({
      type: 'formBuilder/setData',
      index: this.props.index,
      Data: { checksed: checkedValues }
    });
  }

  //添加单选框
  add() {
    const panes = []
    const activeKey = `${this.newTabIndex++}`;
    for (let i = 0; i < this.props.panes.length; i++) {
      var ele = this.props.panes[i]
      panes.push({ value: ele.value, text: ele.text });
    }
    panes.push({ value: activeKey, text: "New Option" });
    this.props.dispatch({
      type: 'formBuilder/setData',
      index: this.props.index,
      Data: {
        panes: panes
      }
    });
  }

  //添加多选框
  checkAdd() {
    const checkPanes = []
    const activeKey = `${this.newTabIndex++}`;
    for (let i = 0; i < this.props.checkPanes.length; i++) {
      var ele = this.props.checkPanes[i]
      checkPanes.push({ value: ele.value, text: ele.text });
    }
    checkPanes.push({ value: activeKey, text: "New Option" });
    this.props.dispatch({
      type: 'formBuilder/setData',
      index: this.props.index,
      Data: {
        checkPanes: checkPanes
      }
    });
  }

  /*************
   批量编辑内容
   **************/
  Edit() {

    if (this.props.panes) {
      for (let i = 0; i < this.props.panes.length; i++) {
        ValList += `${this.props.panes[i].text}\n`
      }
    } else {
      for (let i = 0; i < this.props.checkPanes.length; i++) {
        ValList += `${this.props.checkPanes[i].text}\n`
      }
    }
    this.props.form.setFieldsValue({
      textval: ValList
    })
    this.props.dispatch({
      type: 'formBuilder/setData',
      index: this.props.index,
      Data: {
        visible: true,
      }
    });
  }

  handleOk = (e) => {
    e.preventDefault()
    const formData = this.props.form.getFieldsValue()
    valListarray = formData.textval.split("\n")
    if (valListarray[valListarray.length - 1] === "") {
      valListarray.pop()
    }


    valListarray = valListarray.map(function (item, index) {
      return { value: index, text: item }
    })
    if (this.props.panes) {
      this.props.dispatch({
        type: 'formBuilder/setData',
        index: this.props.index,
        Data: {
          panes: valListarray,
          visible: false
        }
      })
    } else {
      this.props.dispatch({
        type: 'formBuilder/setData',
        index: this.props.index,
        Data: {
          checkPanes: valListarray,
          visible: false
        }
      })
    }

  }
  handleCancel = (e) => {
    this.props.dispatch({
      type: 'formBuilder/setData',
      index: this.props.index,
      Data: {
        visible: false,
      }
    });
  }

  /*changeValue(e) {
   valListarray = e.target.value.split("\n")
   if (valListarray[valListarray.length - 1] === "") {
   valListarray.pop()
   }
   }*/

  //改变单选框的属性值
  InputChange(e) {
    const panesList = []
    for (let i = 0; i < this.props.panes.length; i++) {
      var ele = this.props.panes[i]
      panesList.push({ value: ele.value, text: ele.text });
    }
    panesList[e.target.id].text = e.target.value
    this.props.dispatch({
      type: 'formBuilder/setData',
      index: this.props.index,
      Data: {
        panes: panesList
      }
    });
  }

  //改变多选框的属性值
  InputChanges(e) {
    const checkList = []
    for (let i = 0; i < this.props.checkPanes.length; i++) {
      var ele = this.props.checkPanes[i]
      checkList.push({ value: ele.value, text: ele.text });
    }
    checkList[e.target.id].text = e.target.value
    this.props.dispatch({
      type: 'formBuilder/setData',
      index: this.props.index,
      Data: {
        checkPanes: checkList
      }
    });
  }

  //删除单选框
  Delete(e) {
    const afterList = []
    for (let i = 0; i < this.props.panes.length; i++) {
      var ele = this.props.panes[i]
      afterList.push({ value: ele.value, text: ele.text });
    }
    afterList.splice(e.target.id, 1)
    this.props.dispatch({
      type: 'formBuilder/setData',
      index: this.props.index,
      Data: {
        panes: afterList
      }
    });
  }

  //删除多选框
  checkDelete(e) {
    const CheckafterList = []
    for (let i = 0; i < this.props.checkPanes.length; i++) {
      var ele = this.props.checkPanes[i]
      CheckafterList.push({ value: ele.value, text: ele.text });
    }
    CheckafterList.splice(e.target.id, 1)
    this.props.dispatch({
      type: 'formBuilder/setData',
      index: this.props.index,
      Data: {
        checkPanes: CheckafterList
      }
    });
  }

  componentDidUpdate() {
    ValList = ''

  }

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
      marginLeft: '8px',
      marginBottom: '5px'
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {
          this.props.panes ?
            <div>
              <RadioGroup onChange={this.OptionChange} value={this.props.checked} style={{display: 'block'}}>
                {
                  this.props.panes.map((item, index) => (
                    <Radio style={radioStyle} key={index} value={item.value}>
                      <Input placeholder="Basic usage" id={index} onChange={this.InputChange} value={item.text}
                        style={{ width: "74%" }} />
                      <Icon type="minus-circle-o" id={index} style={{ marginLeft: "5px", color: 'red' }}
                        onClick={this.Delete} />
                      <Icon type="link" style={{ marginLeft: "5px" }} />
                    </Radio>
                  ))
                }
              </RadioGroup>
              <Row style={{ marginTop: '10px', textAlign: 'center' }}>
                <a type="primary" onClick={this.add} style={{ color: '#0DB3A6', marginRight: '2px' }}>
                  <Icon type="plus-circle-o" style={{ marginLeft: "5px", marginTop: "2px" }} />新增
                  </a>|
                  <a type="primary" onClick={this.Edit.bind(this)} style={{ color: '#0DB3A6' }}>
                  <Icon type="edit" style={{ marginLeft: "5px", marginTop: "2px" }} />批量编辑
                  </a>
              </Row>
              <Modal
                title="批量编辑"
                visible={this.props.visible}
                footer={null}
                closable={false}
                onCancel={this.handleCancel}>
                <Tooltip title="请输入修改的内容">
                  <Form layout="inline" style={{ width: "100%" }} onSubmit={this.handleOk}>
                    <FormItem style={{ width: "100%" }}>
                      {getFieldDecorator("textval", { initialValue: ValList })(
                        <TextArea style={{ border: "1px #E9E9E9 solid", padding: "10px 5px", width: "100%" }}
                          autosize={true}>

                        </TextArea>
                      )}
                    </FormItem>
                    <Button type="primary" htmlType="submit" style={{ marginTop: "10px" }}>确定</Button>
                    <Button type="primary" onClick={this.handleCancel}
                      style={{ marginTop: "10px", marginLeft: "12px" }}>取消</Button>
                  </Form>
                </Tooltip>
              </Modal>
            </div>
            :
            <div>
              <CheckboxGroup onChange={this.OptionsChange} value={this.props.checksed}>
                {
                  this.props.checkPanes.map((item, index) => (
                    <Checkbox style={radioStyle} key={index} value={item.value}>
                      <Input placeholder="Basic usage" id={index} onChange={this.InputChanges} value={item.text}
                        style={{ width: "72%" }} />
                      <Icon type="minus-circle-o" id={index} style={{ marginLeft: "5px", color: 'red' }}
                        onClick={this.checkDelete} />
                      <Icon type="link" style={{ marginLeft: "5px" }} />
                    </Checkbox>
                  ))
                }
              </CheckboxGroup>
              <Row style={{ marginTop: '10px', textAlign: 'center' }}>
                <a type="primary" onClick={this.checkAdd} style={{ color: '#0DB3A6', marginRight: '2px' }}>
                  <Icon type="plus-circle-o" style={{ marginLeft: "5px", marginTop: "2px" }} />新增
                </a>|
                <a type="primary" onClick={this.Edit.bind(this)} style={{ color: '#0DB3A6' }}>
                  <Icon type="edit" style={{ marginLeft: "5px", marginTop: "2px" }} />批量编辑
                </a>
              </Row>
              <Modal
                title="批量编辑"
                visible={this.props.visible}
                footer={null}
                closable={false}
                onCancel={this.handleCancel}>
                <Tooltip title="请输入修改的内容">
                  <Form layout="inline" style={{ width: "100%" }} onSubmit={this.handleOk}>
                    <FormItem style={{ width: "100%" }}>
                      {getFieldDecorator("textval", { initialValue: ValList })(
                        <TextArea style={{ border: "1px #E9E9E9 solid", padding: "10px 5px", width: "100%" }}
                          autosize={true}>

                        </TextArea>
                      )}
                    </FormItem>
                    <Button type="primary" htmlType="submit" style={{ marginTop: "10px" }}>确定</Button>
                    <Button type="primary" onClick={this.handleCancel}
                      style={{ marginTop: "10px", marginLeft: "12px" }}>取消</Button>
                  </Form>
                </Tooltip>

              </Modal>
            </div>
        }
      </div>
    )
  }
}
const Selection = Form.create()(SelectionBox)
export default Selection;

import React from 'react';
import { connect } from 'dva';
import { Checkbox, Button, Switch, Select, Radio } from 'antd';
import styles from './Attribute.less'
import com from '../../utils/com'
import CommomCtrol from './CommomCtrol.js'
import Title from '../../components/FormControl/Attribute/Title.js'
import Desc from '../../components/FormControl/Attribute/Desc.js'
import Verification from '../../components/FormControl/Attribute/Verification.js'
import OperationPower from '../../components/FormControl/Attribute/OperationPower.js'
import Formart from '../../components/FormControl/Attribute/Formart.js'
import SelectionBox from '../../components/FormControl/Attribute/SelectionBox'
const RadioGroup = Radio.Group;

function initData() {
  let FormJson = new com.FormJson()
  FormJson.Type = "SingleRadio";
  FormJson.TypeName = "单选框";
  FormJson.Text = "单选框";//标题
  FormJson.panes = [{
    value: "0",
    text: "Option A"
  }, {
    value: "1",
    text: "Option B"
  }, {
    value: "2",
    text: "Option C"
  }]
  FormJson.checked = "1";
  FormJson.visible = false;
  return FormJson;
}
@CommomCtrol()
class RadioMiddel extends React.Component {
  onChange = (e) => {
    this.props.setValue(this.props.index, e.target.value);
  }

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const { ...data } = this.props
    return (
      <RadioGroup value={this.props.itemValue} onChange={this.onChange}>
        {
          data.panes.map((item, index) => (
            <Radio style={radioStyle} key={index} value={item.value}>
              {item.text}
            </Radio>
          ))
        }
      </RadioGroup>
    )
  }
}
class SingleRadio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { mode, ...data } = this.props;
    switch (mode) {
      case 'middle':
        return <RadioMiddel {...this.props} />;
      case 'right':
        return (
          <div className={styles.ControllAttrWrapper}>
            <Title {...this.props} />
            <Desc {...this.props} />
            <SelectionBox {...this.props} />
            <Verification {...this.props} />
            <OperationPower {...this.props} />
            <Formart {...this.props} />
          </div>)
      default:
        return <div>控件加载失败</div>;
    }
  }
}
export default {
  key: "SingleRadio",//
  name: "单选框",
  ico: 'check',
  Component: connect()(SingleRadio),
  Data: initData
};

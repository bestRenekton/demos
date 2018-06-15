import React from 'react';
import { connect } from 'dva';
import { Checkbox, Button, Switch, Select, Row, Col } from 'antd';
import styles from './Attribute.less'
import com from '../../utils/com'
import CommomCtrol from './CommomCtrol.js'
import Title from '../../components/FormControl/Attribute/Title.js'
import Desc from '../../components/FormControl/Attribute/Desc.js'
import Verification from '../../components/FormControl/Attribute/Verification.js'
import OperationPower from '../../components/FormControl/Attribute/OperationPower.js'
import Formart from '../../components/FormControl/Attribute/Formart.js'
import SelectionBox from '../../components/FormControl/Attribute/SelectionBox'

function initData() {
  let FormJson = new com.FormJson()
  FormJson.Type = "CheckBoxes";
  FormJson.TypeName = "复选框";
  FormJson.Text = "复选框";//标题
  FormJson.checkPanes = [{
    value: "0",
    text: "Option A"
  }, {
    value: "1",
    text: "Option B"
  }, {
    value: "2",
    text: "Option C"
  }];
  return FormJson;
}
@CommomCtrol()
class BoxMiddel extends React.Component {
  OptionsChange = (checkedValues) => {
    this.props.setValue(this.props.index, checkedValues.toString());
  }

  render() {
    return (
      <div>
        <Checkbox.Group onChange={this.OptionsChange} value={this.props.itemValue ? this.props.itemValue.split(',') : []}>
          {
            this.props.checkPanes.map((item, index) => (
              <div key={index} style={{ padding: "5px 0" }}>
                <Checkbox value={item.value}>{item.text}</Checkbox>
                <br />
              </div>
            ))
          }
        </Checkbox.Group>
      </div>
    )
  }
}
class CheckBoxes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { mode, ...data } = this.props;
    switch (mode) {
      case 'middle':
        return <BoxMiddel {...this.props} />;
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
  key: "CheckBoxes",//复选框
  name: "复选框",
  ico: 'check-square-o',
  Component: connect()(CheckBoxes),
  Data: initData
};

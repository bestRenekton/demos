import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import styles from './Attribute.less';
import com from '../../utils/com';
import Title from '../../components/FormControl/Attribute/Title.js';
import OperationPower from '../../components/FormControl/Attribute/OperationPower.js';
let FormJson = new com.FormJson()
function initData() {
  let data = {
    //...FormJson,
    Type: 'CardPanel',
    TypeName: '卡片容器',
    Text: '卡片容器',
    IsContainer: true,
    FormId: com.Guid(),
    ContainerType: 'Card',
  }
  return data;
}

class CardPanel extends React.Component {
  constructor(props) {
    console.log("card cst");
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
    const v = Immutable.is(JSON.stringify(this.props), JSON.stringify(nextProps));
    if (v)
      console.log(v);
    return !v;
  }
  render() {
    const { mode, Text, extra, panelBody, dragIndex, panelChild, CurrentIndex, index, dispatch, getFieldDecorator, isPreview, ControlList, setValue } = this.props;
    switch (mode) {
      case 'middle':
        return (<Card title={Text} extra={extra}>
          {
            panelBody.map((C) => {
              let pj = {
                mode: 'middle',
                key: C.index,
                index: C.index,
                container: this.props.index,
                setValue: setValue,
                itemValue:C.itemValue,
                ...C.Data
              };
              if (isPreview) {
                pj = {
                  ...pj,
                  isPreview: isPreview,
                  getFieldDecorator: getFieldDecorator
                }
              }
              else {
                pj = {
                  ...pj,
                  select: CurrentIndex == C.index,
                  dragIndex: dragIndex,
                }
              }
              if (C.Data.IsContainer) {
                pj = {
                  ...pj,
                  panelBody: com.getCList(C.Id, panelChild),
                  panelChild: com.GetChildCList(C, panelChild),
                  CurrentIndex: CurrentIndex,
                  ControlList: ControlList
                }
              }
              if (isPreview) {
                let Preview = ControlList.filter(a => a.key == C.key);
                if (Preview.length > 0) {
                  let PC = Preview[0]
                  return <PC.Component {...pj} />
                }
                else { return null; }
              }
              else { return <C.Component {...pj} /> }
            })
          }
        </Card>)
      case 'right':
        return (
          <div className={styles.ControllAttrWrapper}>
            <Title {...this.props} />
            <OperationPower {...this.props} />
          </div>)
      default:
        return <div>控件加载失败</div>;
    }
  }
}
export default {
  key: "Card",//卡片容器
  name: "卡片容器",
  ico: 'credit-card',
  Component: connect()(CardPanel),
  Data: initData
};

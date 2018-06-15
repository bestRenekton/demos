import React, { PropTypes, Layout } from 'react';
import { connect } from 'dva';
import { Col, Button } from 'antd';
import Control from '../../components/FormList/Attribute/Control';
import Attribute from '../../components/FormList/Attribute/Attribute';
import styles from './FormTemplate.less'
import { browserHistory } from 'react-router';


function FormTemplate({ children, location, dispatch, formTemplate }) {
  let {PreviewList, ControlList, CurrentControl, PreviewShow, } = formTemplate;
  let ControlProps = {
    ControlList: ControlList,
    ControlClick(item) {
      console.log(item);
      dispatch({
        type: "formTemplate/SetCurrentControl",
        payload: { control: item }

      })
    }
  }
  let AttributeProps = {
    CurrentControl: CurrentControl,
    TitleInputChange(ele) {
      var value = ele.target.value;
      dispatch({
        type: "formTemplate/SetCurrentControlTitle",
        payload: { Text: value }
      })
    },
    DescInputChange(ele) {
      var value = ele.target.value;
      dispatch({
        type: "formTemplate/SetCurrentControlDesc",
        payload: { Text: value }
      })
    },
    SetSwitch(type, checked) {
      dispatch({
        type: "formTemplate/SetCurrentControlSwitch",
        payload: { type: type, checked: checked }
      })
    },
    SetFormart(value) {
      debugger
      dispatch({
        type: "formTemplate/SetCurrentControlFormart",
        payload: { type: value }
      })
    }

  }
  let PreviewProps = {
    PreviewList: PreviewList,
    PreviewShow: PreviewShow,
    Preview() {
      dispatch({
        type: "formTemplate/PreviewShowFn"
      })
    },
    Ok() {
      dispatch({
        type: "formTemplate/PreviewHideFn"
      })

    },
    handleCancel() {
      dispatch({
        type: "formTemplate/PreviewHideFn"
      })
    }
  }

  return (
    <div className={styles.FormWrapper}>
      <Col span="2">
        <Preview {...PreviewProps} />
      </Col>
      <Col span="16" className={styles.ControlContent}>
        <Control {...ControlProps} />
      </Col>
      <Col span="6">
        <Attribute {...AttributeProps} />
      </Col>
    </div>
  )
}

function mapStateToProps({ formTemplate }) {
  return { formTemplate }
}

export default connect(mapStateToProps)(FormTemplate)
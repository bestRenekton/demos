import React, { PropTypes, Layout } from 'react';
import { connect } from 'dva';
import { Row, Col, Tabs, Form, Button, List } from 'antd';
import { browserHistory } from 'react-router';
import styles from '../FormBuilder/FormBuilder.less';
import FormDropTarget from '../../components/HOC/FormDropTarget';
import FormDragSource from '../../components/HOC/FormDragSource';
import Operate from '../../components/FormControl/Operate.js';
import Preview from '../../components/FormControl/Preview/Preview.js';
import com from '../../utils/com';
import FORMSTATUS from '../../models/FormBuilder/FormStatus';
import FormRender from '../../components/FormControl/FormRender/FormRender';
import FormulaEditor from '../../components/FormControl/FormulaEditor/FormulaEditor';
import Immutable from 'immutable';
import { Router, Route, Switch, Redirect } from 'dva/router';

// 测试
import Cooperate from "../../components/cooperate";

const TabPane = Tabs.TabPane;
class FormViewer extends React.Component {
    componentDidMount() {
    }
    componentDidUpdate() {
        console.log('fv update!');
    }
    constructor(props) {
        super(props);
        this.state = { value: '123' };
        console.log(this.props);
    }
    setValue(index, value) {
        this.props.dispatch({
            type: "formViewer/setValue",
            index: index,
            Value: value,

        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        function _toImmutable(params) {
            return Immutable.fromJS(params);
        }
        const thisProps = this.props || {}, thisState = this.state || {};
        if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
            Object.keys(thisState).length !== Object.keys(nextState).length) {
            return true;
        }
        for (const key in nextProps) {
            // 由于数据中存在函数，所以用 is 函数判断不了
            if (!Immutable.is(_toImmutable(thisProps[key]), _toImmutable(nextProps[key])) && !(thisProps[key] instanceof Function)) {
                return true;
            }
        }
        for (const key in nextState) {
            if (thisState[key] !== nextState[key] || !Immutable.is(thisState[key], nextState[key])) {
                return true;
            }
        }
        return false;
    }
    isToRoute(item) {
        let {history,appMain} = this.props;
        item.type == 1 && (() => {
            let {panes} = appMain;
            let tempPath = `/main/${item.key}`;
            console.log(panes);
            let isExist = panes.filter(v=>(v.key == item.key));
            console.log(isExist);
            if(!isExist.length){
                let tempObj = { key: item.key, model: "formBuilder", title: item.name, component: <Route path={tempPath} component={item.component} />, closeable: true }
                this.props.dispatch({
                    type: "appMain/PanesAdd",
                    payload: tempObj
                });
                
            }
            this.props.dispatch({
                type: "appMain/ChangeActiveKey",
                payload: item.key
            });
            history.push(`${item.key}`);
        })();

    }
    render() {
        console.log("功能模块渲染没");
        let { ControlList, FormBody, IsSubmitting, RootContainer, RootFormId, FormTemplateId, FormTitle,
            FormTemplateVersionId, FormStatus, FormTemplateInstanceId, FormInstanceId }
            = this.props.formViewer;
        const { getFieldDecorator, validateFieldsAndScroll, getFieldsError, isFieldTouched, getFieldError } = this.props.form;
        const RootList = FormBody.filter(a => a.container == RootContainer);
        const OtherList = FormBody.filter(a => a.container != RootContainer);
        let handleSubmit = function (e) {
            e.preventDefault();
            this.props.dispatch({
                type: "formViewer/beginSubmit",
                FormBody: FormBody.filter(a => a.Data.IsContainer != true),
                RootContainer: RootContainer,
                FormTemplateId: FormTemplateId,
                FormInstanceId: FormInstanceId,
                FormTemplateInstanceId: FormTemplateInstanceId,
                FormTemplateVersionId: FormTemplateVersionId,
                RootFormId: RootFormId,
                FormStatus: FormStatus
            })
        }

        let tempList = [{
            component:Cooperate,
            key:"form",
            name: "表格",
            type: 1,
        }, {
            component:Cooperate,
            key:"word",
            name: "word",
            type: 1,
        }, {
            component:Cooperate,
            key:"excel",
            name: "excel",
            type: 1,
        }, {
            component:Cooperate,
            key:"ppt",
            name: "ppt",
            type: 1,
        }, {
            name: "不跳转",
            type: 0
        }];
        return (
            <div>
                <List
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={tempList}
                    renderItem={item => (<List.Item onClick={this.isToRoute.bind(this, item)}>{item.name}</List.Item>)}
                />
                <Row style={{ height: '100%' }}>
                    <Col span="24" className={styles.ControlContent + ' ' + styles.FormWrapper}>
                        <Form onSubmit={handleSubmit.bind(this)}>
                            <FormRender FormBody={FormBody} setValue={this.setValue.bind(this)} RootContainer={RootContainer} getFieldDecorator={getFieldDecorator} ControlList={ControlList} />
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
function mapStateToProps({ loading, formViewer,appMain }) {
    debugger
    return { formViewer, loading: loading.models.formViewer,appMain }
}

export default Form.create()(connect(mapStateToProps)(FormViewer))
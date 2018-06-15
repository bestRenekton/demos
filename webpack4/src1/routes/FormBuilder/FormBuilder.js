import React, { PropTypes, Layout } from 'react';
import { connect } from 'dva';
import { Row, Col, Tabs } from 'antd';
import { browserHistory } from 'react-router';
import styles from './FormBuilder.less';
import FormDropTarget from '../../components/HOC/FormDropTarget';
import FormDragSource from '../../components/HOC/FormDragSource';
import Operate from '../../components/FormControl/Operate.js';
import Preview from '../../components/FormControl/Preview/Preview.js';
import com from '../../utils/com';
import FORMSTATUS from '../../models/FormBuilder/FormStatus';


const TabPane = Tabs.TabPane;
//function FormBuilder({ dispatch, formBuilder }) {
class FormBuilder extends React.Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'formBuilder/reload'
        });
    }
    componentDidUpdate() {
        //console.log('fb update!');
    }
    constructor(props) {
        super(props);
    }
    render() {
        let { ControlList, LeftList, FormBody, CurrentIndex, PreviewShow, PreviewList,
            IsSubmitting, DragIndex, RootContainer, RootFormId, PreviewRootList, FormStatus,
            FormTemplateId, FormTitle, FormTemplateVersionId, IsUsed, TempDataLinkerOptions } = this.props.formBuilder;
        let dispatch = this.props.dispatch;
        let currentFormItemList = [];
        FormBody.filter(a => a.Data.Type == 'SingleText' || a.Data.Type == 'Number').forEach(function (e, i) {
            currentFormItemList.push({ id: e.index, title: e.Data.Text, type: e.Data.Type });
        });
        let setValue = function (index, value) {
            dispatch({
                type: "formBuilder/setValue",
                index: index,
                Value: value,

            })
        }
        const OperateProps = {
            IsSubmitting: IsSubmitting,
            FormTitle: FormTitle,
            dispatch: dispatch,
            Preview() {
                dispatch({
                    type: "formBuilder/PreviewShowFn"
                })
            },
            Save() {
                dispatch({
                    type: "formBuilder/beginSave",
                    FormBody: FormBody.filter(a => a.status != FORMSTATUS.NoChange),
                    RootContainer: RootContainer,
                    FormTemplateId: FormTemplateId,
                    FormTemplateVersionId: FormTemplateVersionId,
                    RootFormId: RootFormId,
                    FormTitle: FormTitle,
                    FormStatus: FormStatus,
                    IsUsed: IsUsed
                })
            }
        }
        const PreviewProps = {
            FormBody: FormBody,
            ControlList: ControlList,
            PreviewShow: PreviewShow,
            //FormBody: FormBody,
            PreviewList: PreviewList,
            RootContainer: RootContainer,
            setValue: setValue,
            //DragIndex:DragIndex,
            //CurrentIndex :CurrentIndex ,
            Ok() {
                dispatch({
                    type: "formBuilder/PreviewHideFn"
                })

            },
            handleCancel() {
                dispatch({
                    type: "formBuilder/PreviewHideFn"
                })
            }
        }
        let Current = { Component: () => null };
        if (CurrentIndex != -1) {
            const cn = FormBody.filter(a => a.index == CurrentIndex)[0];
            Current = { Component: ControlList.filter(a => a.key == cn.key)[0].Component, Data: cn.Data };
        }

        const RootList = FormBody.filter(a => a.container == RootContainer && a.status != FORMSTATUS.Delete);
        const OtherList = FormBody.filter(a => a.container != RootContainer && a.status != FORMSTATUS.Delete);
        return (
            <Row style={{ height: '100%' }}>
                <Preview {...PreviewProps} />
                <Row className={styles.FormWrapper}>
                    <Col span="4" className={styles.ControlContent} style={{ left: "0" }} >
                        <div className={styles.ControlItem}>
                            {
                                LeftList.map(function (C, i) {
                                    return <C key={i} name={ControlList[i].key} />
                                })
                            }
                        </div>
                    </Col>
                    <Col span="14" className={styles.ControlContent} style={{ left: "16.7%", overflow: "hidden" }} >
                        <Operate {...OperateProps} />
                        <div className={styles.Content}>
                            <FormDropTarget dragIndex={DragIndex} container={RootContainer}>
                                {
                                    RootList.map((C) => {
                                        let pj = {
                                            mode: 'middle',
                                            dragIndex: DragIndex,
                                            container: C.container,
                                            key: C.index,
                                            index: C.index,
                                            CurrentIndex: CurrentIndex,
                                            select: CurrentIndex == C.index,
                                            itemValue: C.itemValue,
                                            ...C.Data
                                        };
                                        if (C.Data.IsContainer)
                                            pj = {
                                                ...pj,
                                                ControlList: ControlList,
                                                panelBody: com.getCList(C.Id, OtherList),
                                                panelChild: com.GetChildCList(C, OtherList),
                                                CurrentIndex: CurrentIndex
                                            };
                                        return <C.Component {...pj} />
                                    })
                                }
                            </FormDropTarget>
                        </div>
                    </Col>
                    <Col span="6" className={styles.ControlContent} style={{ left: "75%" }}  >
                        <Tabs defaultActiveKey="1" className={styles.ControlTab}>
                            <TabPane tab="控件属性" key="1">
                                <div className={styles.ControllAttrWrapper}>
                                    <Current.Component {...Current.Data} curFIL={currentFormItemList.filter(a => a.id != CurrentIndex)} TempDataLinkerOptions={TempDataLinkerOptions} index={CurrentIndex} mode='right' />
                                </div>
                            </TabPane>
                            <TabPane tab="表单属性" key="2">2</TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Row>
        )
    }
}
function mapStateToProps({ loading, formBuilder }) {
    return { formBuilder, loading: loading.models.formBuilder }
}
export default connect(mapStateToProps)(FormBuilder)
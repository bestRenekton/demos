import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import styles from './Attribute.less';
import com from '../../utils/com';
import TabItems from '../../components/FormControl/Attribute/TabItems';
import OperationPower from '../../components/FormControl/Attribute/OperationPower';
import Immutable from 'immutable';
import FormStatus from '../../models/FormBuilder/FormStatus';

const TabPane = Tabs.TabPane;

function initData() {
    let data = {
        Type: 'TabPanel',
        TypeName: '标签容器',
        IsContainer: true,
        FormId: com.Guid(),
        ContainerType: 'Tab',
        TabKeys: [{ title: '标签页1', key: com.Guid(), FormId: com.Guid(), status: FormStatus.Add }, { title: '标签页2', key: com.Guid(), FormId: com.Guid(), status: FormStatus.Add }],
    }
    data.ActiveKey = data.TabKeys[0].key;
    return data;
}

class TabPanel extends React.Component {
    constructor(props) {
        console.log("tab cst");
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true;
        const v = Immutable.is(JSON.stringify(this.props), JSON.stringify(nextProps));
        if (v)
            console.log(v);
        return !v;
    }
    onChange = (activeKey) => {
        if (this.props.isPreview)
            return;
        this.props.dispatch({
            type: 'formBuilder/setData',
            index: this.props.index,
            Data: { ActiveKey: activeKey }
        });
    }
    render() {
        console.log('TabPanel render!');
        const { mode, TabKeys, ActiveKey, extra, panelBody, panelChild, CurrentIndex, index, dispatch, getFieldDecorator, isPreview, ControlList, setValue } = this.props;
        const showTabKeys = TabKeys.filter(a => a.status != FormStatus.Delete)
        switch (mode) {
            case 'middle':
                const preview = isPreview ? {} : { activeKey: ActiveKey.toString(), onChange: this.onChange };
                return (
                    <Tabs type="card" {...preview} style={{ margin: '10xp', backgroundColor: 'white' }}>
                        {
                            showTabKeys.map((TabKey, i) => {
                                const TabContent = panelBody.filter(a => a.Data.TabKey == TabKey.key);
                                return <TabPane tab={TabKey.title} key={TabKey.key}>
                                    {
                                        TabContent.map((C) => {
                                            let pj = {
                                                mode: 'middle',
                                                key: C.index,
                                                index: C.index,
                                                container: this.props.index,
                                                setValue: setValue,
                                                itemValue: C.itemValue,
                                                ...C.Data
                                            };
                                            if (C.Data.IsContainer) {
                                                pj = {
                                                    ...pj,
                                                    panelBody: com.getCList(C.Id, panelChild),
                                                    panelChild: com.GetChildCList(C, panelChild),
                                                    CurrentIndex: CurrentIndex,
                                                    ControlList: ControlList
                                                }
                                            }
                                            /*if (isPreview) {
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
                                                }
                                            }*/
                                            if (isPreview) {
                                                pj = {
                                                    ...pj,
                                                    isPreview: isPreview,
                                                    getFieldDecorator: getFieldDecorator
                                                }
                                                let Preview = ControlList.filter(a => a.key == C.key);
                                                if (Preview.length > 0) {
                                                    let PC = Preview[0]
                                                    return <PC.Component {...pj} />
                                                }
                                                else { return null; }
                                            }
                                            else {
                                                pj = {
                                                    ...pj,
                                                    select: CurrentIndex == C.index,
                                                }
                                                return <C.Component {...pj} />
                                            }
                                        })
                                    }
                                </TabPane>
                            })
                        }
                    </Tabs>
                )
            case 'right':
                return (
                    <div className={styles.ControllAttrWrapper}>
                        <TabItems {...this.props} />
                        <OperationPower {...this.props} />
                    </div>)
            default:
                return <div>控件加载失败</div>;
        }
    }
}
export default {
    key: "Tab",//标签容器
    name: "标签容器",
    ico: 'folder',
    Component: connect()(TabPanel),
    Data: initData
};

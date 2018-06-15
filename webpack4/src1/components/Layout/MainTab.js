import React, { Component } from 'react';
import { Tabs, Button, Layout } from 'antd';
import { Switch, Route } from 'dva/router';
import styles from './main.less';
import config from '../../utils/config';
import dynamic from 'dva/dynamic';
import { connect } from 'dva';
import Immutable from 'immutable';

const TabPane = Tabs.TabPane;
/* function MainTab({ activeKey, panes, dispatch, onClick, onEdit, match, loading }) {
    console.log("主要内容是否会被渲染");
    return (
        <Tabs className={styles.MainTab} activeKey={activeKey} animated={true} type="editable-card" hideAdd onTabClick={onClick} onEdit={onEdit}>
            {
                panes.map(pane => {
                    if (pane.component.props.children)
                        return <TabPane style={{ height: "100%" }} tab={pane.title} key={pane.key} closable={pane.closeable}>
                            {pane.component}
                        </TabPane>
                    else {
                        let C = pane.component.props.component;
                        // console.log(C);
                        return <TabPane style={{ height: "100%" }} tab={pane.title} key={pane.key} closable={pane.closeable}>
                            <C />
                        </TabPane>
                    }
                })
            }
        </Tabs>
    )
} */
class MainTab extends Component {
    constructor() {
        super();
        this.state = {};
    }
    
    shouldComponentUpdate(nextProps,nextState){
        function _toImmutable(params){
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
    render() {
        console.log("主要内容是否会被渲染");
        let { activeKey, panes, dispatch, onClick, onEdit, match, loading } = this.props;
        return (
            <Tabs className={styles.MainTab} activeKey={activeKey} animated={true} type="editable-card" hideAdd onTabClick={onClick} onEdit={onEdit}>
                {
                    panes.map(pane => {
                        if (pane.component.props.children){
                            return <TabPane style={{ height: "100%" }} tab={pane.title} key={pane.key} closable={pane.closeable}>
                                {pane.component}
                            </TabPane>
                        }else {
                            let C = pane.component.props.component;
                            let path = pane.component.props.path;
                            return <TabPane style={{ height: "100%" }} tab={pane.title} key={pane.key} closable={pane.closeable}>
                                <Route path={path} component={C}/>
                            </TabPane>
                        }
                    })
                }
            </Tabs>
        );
    }
}
export default connect(({ dispatch }) => ({ dispatch }))(MainTab);
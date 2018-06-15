import React, { PropTypes, Component } from 'react';
import { connect } from 'dva';
import { Layout, LocaleProvider } from 'antd';
import styles from './Main.less'
import Head from '../../components/Layout/Header';
import Foot from '../../components/Layout/Footer';
import SiderBar from '../../components/Layout/Sider';
import MainTab from '../../components/Layout/MainTab';
import Bread from '../../components/Layout/Bread';
import { browserHistory } from 'react-router';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import config from '../../utils/config';
import Immutable from 'immutable';
import queryString from 'query-string';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import update from 'immutability-helper';

const { Header, Content, Footer, Sider } = Layout;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.dispatch({
      type: "appMain/QueryMenu" 
    });
    console.log(this.props);
  }
  // 初始化数据
  init(nextProps) {
    const { location, dispatch, appMain, history, match, tabItems, loading } = nextProps;
    const { user, collapsed, Tabs, panes, activeKey, menu, bread } = appMain;

    /* let pathNew = location.pathname;
    let activeKeyNew = activeKey;
    if (tabItems && bread.length > 0) {
      let exist = panes.filter((item) => { return item.key == pathNew });
      let breadItem = bread.filter((item) => { return '/main/' + item.key == pathNew });
      console.log(bread);
      // console.log(breadItem);
      if (breadItem.length > 0) {
        if (exist.length == 0) {
          let item = tabItems.filter(a => a.key == breadItem[0].key)[0];
          panes.push({ key: pathNew, model: item.model, title: breadItem[0].name, component: item.component, closeable: true });
        }
        activeKeyNew = pathNew;
      }
    } */
    const HeaderProps = {
      user: user,
      LoginOut() {
        dispatch({
          type: 'appMain/LoginOut',
          history: history
        })
      }
    }
    const SilderBarProps = {
      menu: menu,
      match: match,
      panes: panes,
      location: location,
      bread: bread,
      tabItems: tabItems,
      collapsed: collapsed,
      toOtherLink: function (key) {
        let tempLink = `${match.path}/${key}`;
        // console.log(tempLink);
        // console.log(location);
        location.pathname != tempLink && (function () {
          

          // 判断当前的panes是否存在当前的 item
          let pathNew = tempLink;
          let exist = panes.filter((item) => { return item.key == pathNew });
          let breadItem = bread.filter((item) => { return `/main/${item.key}` == pathNew });
          // console.log(exist);
          // console.log(breadItem);
          // console.log("页面加载的速度");
          if (!exist.length && breadItem.length) {
            let item = tabItems.filter(a => a.key == breadItem[0].key)[0];
            // console.log({ key: pathNew, model: item.model, title: breadItem[0].name, component: item.component, closeable: true });
            dispatch({
              type: "appMain/PanesAdd",
              payload: { key: pathNew, model: item.model, title: breadItem[0].name, component: item.component, closeable: true }
            });
          }
          history.push(tempLink);
        })();
        dispatch({
          type: "appMain/ChangeActiveKey",
          payload: tempLink
        });
        console.log("这里会慢吗");
      },
      toggleCollapsed: function () {
        dispatch({ type: 'appMain/toggleCollapsed' })
      }
    }
    const MainTabProps = {
      // loading: loading,
      match: match,
      panes: panes,
      activeKey: activeKey,
      onClick(key) {
        location.pathname !== key && history.push(key);
        dispatch({
          type: "appMain/ChangeActiveKey",
          payload: key
        });
      },
      onEdit(targetKey, action) {
        if (action == "remove") {
          let index;
          panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
              index = i;
            }
          });
          dispatch({
            type: "appMain/removeTab",
            index: index
          })
          dispatch({
            type: "appMain/ChangeActiveKey",
            payload: panes[index - 1].key
          });
          //if (activeKeyNew == panes[index].key)
          history.push(panes[index - 1].key);
        }
      }
    }
    const BreadProps = {
      bread: bread,
      location: location
    }

    this.setState(update(this.state, {
      HeaderProps: { $set: HeaderProps },
      SilderBarProps: { $set: SilderBarProps },
      MainTabProps: { $set: MainTabProps },
      BreadProps: { $set: BreadProps },
      collapsed: { $set: collapsed }
    }));
  }
  componentWillReceiveProps(nextProps) {
    this.init(nextProps);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {}, thisState = this.state || {};
    if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length) {
      return true;
    }
    for (const key in nextProps) {
      if (!Immutable.is(thisProps[key], nextProps[key]) && !(thisProps[key] instanceof Function)) {
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
    console.log("最外层的layOut重新渲染");
    return (
      <LocaleProvider locale={zhCN}>
        <Layout style={{ height: '100%' }}>
          <Header style={{ background: '#404040', padding: 0, "height": "auto" }}>{this.state.HeaderProps && <Head {...this.state.HeaderProps} />}
          </Header>
          <Layout>
            <Sider className={this.state.collapsed ? styles.siderColls : styles.sider}>{
              this.state.SilderBarProps && <SiderBar  {...this.state.SilderBarProps} />
            }</Sider>
            <Layout>
              {/* {this.state.BreadProps && <Bread {...this.state.BreadProps} />} */}
              <Content style={{ background: '#fff', padding: "10px 10px 0px 10px", position: 'relative' }}>
                {
                  this.state.MainTabProps && <MainTab style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} {...this.state.MainTabProps} />
                }
              </Content>
              <Footer style={{ 'textAlign': 'center', "padding": "10px 0", background: "#ececec" }}>
                {config.footerText}
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </LocaleProvider>
    );
  }
}

/* function Main({ location, dispatch, appMain, history, match, tabItems, loading }) {
  const { user, collapsed, Tabs, panes, activeKey, menu, bread } = appMain;
  let pathNew = location.pathname;
  let activeKeyNew = activeKey;
  if (tabItems && bread.length > 0) {
    let exist = panes.filter((item) => { return item.key == pathNew });
    let breadItem = bread.filter((item) => { return '/main/' + item.key == pathNew });
    // console.log(breadItem);
    if (breadItem.length > 0) {
      if (exist.length == 0) {
        let item = tabItems.filter(a => a.key == breadItem[0].key)[0];
        panes.push({ key: pathNew, model: item.model, title: breadItem[0].name, component: item.component, closeable: true });
      }
      else {// if (Immutable.is(JSON.stringify(exist[0].component.props.location.query), JSON.stringify(location.search))) {
        //exist[0].component = tabItems.filter(a => a.key == breadItem[0].key)[0].component;
      }
      activeKeyNew = pathNew;
    }
  }
  const HeaderProps = {
    user: user,
    LoginOut() {
      dispatch({
        type: 'appMain/LoginOut',
        history: history
      })
    }
  }
  const SilderBarProps = {
    menu: menu,
    match: match,
    panes: panes,
    location: location,
    collapsed: collapsed,
    toggleCollapsed: function () {
      dispatch({ type: 'appMain/toggleCollapsed' })
    }
  }
  const MainTabProps = {
    loading: loading,
    match: match,
    panes: panes,
    activeKey: activeKeyNew,
    onClick(key) {
      location.pathname !== key && history.push(key);
    },
    onEdit(targetKey, action) {
      if (action == "remove") {
        let index;
        panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            index = i;
          }
        });
        dispatch({
          type: "appMain/removeTab",
          index: index
        })
        //if (activeKeyNew == panes[index].key)
        history.push(panes[index - 1].key);
      }
    }
  }
  const BreadProps = {
    bread: bread,
    location: location
  }
  console.log("最外层的layOut重新渲染");
  return (

    <LocaleProvider locale={zhCN}>
      <Layout style={{ height: '100%' }}>
        <Header style={{ background: '#404040', padding: 0, "height": "auto" }}><Head {...HeaderProps} />
        </Header>
        <Layout>
          <Sider className={collapsed ? styles.siderColls : styles.sider}><SiderBar  {...SilderBarProps} /></Sider>
          <Layout>
            <Bread {...BreadProps} />
            <Content style={{ background: '#fff', padding: "10px 10px 0px 10px", position: 'relative' }}>
              <MainTab style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} {...MainTabProps} />
            </Content>
            <Footer style={{ 'textAlign': 'center', "padding": "10px 0", background: "#ececec" }}>
              {config.footerText}
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </LocaleProvider>
  )
}
 */
function mapStateToProps({ loading, appMain }) {
  return {
    // loading: loading,
    appMain
  }
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps)(Main));
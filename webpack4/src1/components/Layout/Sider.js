import React, { PropTypes, Component } from 'react'
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './main.less';
import config from '../../utils/config';
import Immutable from "immutable";
import { connect } from 'dva';

function MenuShow({ menu, match, location, toOtherLink }) {
    return menu.map(item => {
        if (item.children.length > 0) {
            return (<Menu.SubMenu key={item.key} title={<span><Icon type={item.icon}></Icon>{item.name}</span>}>
                {MenuShow({ menu: item.children, match, location, toOtherLink })}
            </Menu.SubMenu>)
        } else {
            // let tempLink = match.path + '/' + item.key;
            return (<Menu.Item key={item.key}>
                <div onClick={toOtherLink.bind(this, item.key)} >
                    <Icon type={item.icon} >
                    </Icon>
                    {item.name}
                </div>
                {/* {
                    location.pathname == tempLink ? (
                        <div>
                            <Icon type={item.icon} >
                            </Icon>
                            {item.name}
                        </div>
                    ) : (
                            // <Link to={tempLink} >
                            //     <Icon type={item.icon} >
                            //     </Icon>
                            //     {item.name}
                            // </Link>
                            <div onClick={toOtherLink.bind(this,item.key)} >
                                <Icon type={item.icon} >
                                </Icon>
                                {item.name}
                            </div>
                        )
                } */}

            </Menu.Item>)
        }
    })
}
function SiderBar({ collapsed, menu, toggleCollapsed, match, location, toOtherLink, dispatch, bread, tabItems, panes,appMain }) {
    console.log("左边栏被渲染");
    let {activeKey} = appMain;
    let tempActiveKey = activeKey.split("/");
    return (
        <div>
            <Menu mode="inline" theme="dark" inlineCollapsed={collapsed} selectedKeys={[tempActiveKey[tempActiveKey.length-1]]}>
                {
                    MenuShow({ menu, match, location, toOtherLink })
                }
            </Menu>
            <div onClick={toggleCollapsed} className={styles.siderTrigger}>
                <Icon className="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} />
            </div>
        </div>
    )
}


export default connect(({ dispatch,appMain }) => ({ dispatch,appMain }))(SiderBar);;
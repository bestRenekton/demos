import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './main.less';
import config from '../../utils/config';
const SubMenu = Menu.SubMenu;

function Head({ user, LoginOut }) {
    function MenuItemClick(item) {
        if (item.key === 'logout') {
            LoginOut();
        }
    }
    return (
        <div>
            <div className={styles.logo}> 
                <img src={config.logoSrc} />
                <span className={styles.headerTitle}>{config.logoText}</span>
            </div>
            <Menu theme="dark" className={styles.headerMenu} mode="horizontal" onClick={MenuItemClick}>

                <SubMenu style={{ float: 'right' }} title={<span> <Icon type="user" />{user.name}</span>}>
                    <Menu.Item key="logout">
                        <a>注销</a>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>

    )
}
export default Head;


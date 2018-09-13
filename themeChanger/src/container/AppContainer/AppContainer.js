import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styles from './AppContainer.scss'

import AppHeader from '../../component/AppHeader/AppHeader'
import AppFooter from '../../component/AppFooter/AppFooter'
import pic from '../../public/img/test.jpg'
import { Input, Button } from 'antd'

import BlockColor from '../../component/BlockColor'
// import testPlugin from 'testPlugin'
// console.log(testPlugin)


export default class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
        this.colorChange = this.colorChange.bind(this);
    }
    colorChange(val) {
        window.less.modifyVars(
            {
                '@primary-color': val,
                '@link-color': val,
                '@btn-primary-bg': val,
            }
        )
    }
    render() {
        return (
            <div className={styles.body}>
                <AppHeader />
                <main className={styles.page}>
                    {/* <testPlugin.Test /> */}
                    <p className={styles.txt}>{`<p>标签使用css原生变量var实现变色...`}</p>
                    <Input placeholder={'antd组件变色'} />
                    <Button type="primary" style={{marginBottom:50}}>antd组件变色</Button>
                    <div className={styles.Setting}>
                        <div className={styles.part}>
                            <p className={styles.part_title}>主题色设置</p>
                            <BlockColor
                                list={[
                                    {
                                        key: '#f5222d',
                                        title: '薄暮',
                                    },
                                    {
                                        key: '#fa541c',
                                        title: '火山',
                                    },
                                    {
                                        key: '#faad14',
                                        title: '日暮',
                                    },
                                    {
                                        key: '#13c2c2',
                                        title: '明青',
                                    },
                                    {
                                        key: '#52c412',
                                        title: '极光青',
                                    },
                                    {
                                        key: '#1890ff',
                                        title: '拂晓蓝（默认）',
                                    },
                                    {
                                        key: '#2f54eb',
                                        title: '极客蓝',
                                    },
                                    {
                                        key: '#722ed1',
                                        title: '酱紫',
                                    },
                                ]}
                                onChange={this.colorChange}
                            />
                        </div>
                    </div>
                </main>
                <AppFooter />
            </div>
        )
    }
}




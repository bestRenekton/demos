import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styles from './AppContainer.scss'

import AppHeader from '../../component/AppHeader/AppHeader'
import AppFooter from '../../component/AppFooter/AppFooter'
import pic from '../../public/img/test.jpg'
import { Input, Button } from 'antd'

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
                    <p className={styles.txt}>hello...</p>
                    <Input />
                    <Button type="primary">Primary</Button>
                    <p onClick={() => { this.colorChange('#f5222d') }}>#f5222d</p>
                    <p onClick={() => { this.colorChange('#36cfc9') }}>#36cfc9</p>
                    {/* <Route exact path='/' component={HomeContainer} />
                    <Route path='/archives' component={ArchivesContainer} />
                    <Route path='/demo' component={DemoContainer} />
                    <Route path='/about' component={AboutContainer} />
                    <Route path="/detail/:id" component={DetailArticle} />
                    <Route path="/demoDetail/:id" component={DetailDemos} /> */}
                </main>
                <AppFooter />
            </div>
        )
    }
}




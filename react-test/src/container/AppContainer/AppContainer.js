import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styles from './AppContainer.scss'
import 'antd/dist/antd.css';

import AppHeader from '../../component/AppHeader/AppHeader'
import AppFooter from '../../component/AppFooter'
import HomeContainer from '../HomeContainer/HomeContainer'
import ArchivesContainer from '../ArchivesContainer/ArchivesContainer'
import DemoContainer from '../DemoContainer/DemoContainer'
import AboutContainer from '../AboutContainer/AboutContainer'
import DetailArticle from '../../component/DetailArticle/DetailArticle'
import DetailDemos from '../../component/Demos/DetailDemos/DetailDemos'


export default class AppContainer extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         index: 0
    //     }
    // }
    render() {
        return (
            <div className={styles.body}>
                <AppHeader />
                <main className={styles.page}>
                {/* <div className="wrapper"> */}
                    <Route exact path='/' component={HomeContainer} />
                    <Route path='/archives' component={ArchivesContainer} />
                    <Route path='/demo' component={DemoContainer} />
                    <Route path='/about' component={AboutContainer} />
                    <Route path="/detail/:id" component={DetailArticle} />
                    <Route path="/demoDetail/:id" component={DetailDemos} />
                {/* </div> */}
                </main>
                <AppFooter />
            </div>
        )
    }
}




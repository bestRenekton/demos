import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import styles from './AppContainer.scss'

import AppHeader from '../../component/AppHeader/AppHeader'
import AppFooter from '../../component/AppFooter'
import HomeContainer from '../HomeContainer/HomeContainer'
import ArchivesContainer from '../ArchivesContainer/ArchivesContainer'
import DemoContainer from '../DemoContainer/DemoContainer'
import AboutContainer from '../AboutContainer/AboutContainer'


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
                    <Route exact path='/' component={HomeContainer} />
                    <Route path='/archives' component={ArchivesContainer} />
                    <Route path='/demo' component={DemoContainer} />
                    <Route path='/about' component={AboutContainer} />
                </main>
                <AppFooter />
            </div>
        )
    }
}




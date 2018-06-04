import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styles from './AppContainer.scss'

import AppHeader from '../../component/AppHeader/AppHeader'
import AppFooter from '../../component/AppFooter/AppFooter'



export default class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }
    render() {
        return (
            <div className={styles.body}>
                <AppHeader />
                <main className={styles.page}>
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




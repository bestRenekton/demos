import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import styles from './AppContainer.scss'

import Header from '../../component/AppHeader/AppHeader'
import Footer from '../../component/AppFooter'
import About from '../../container/About'
import Home from '../../container/Home'


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
                <Header />
                <main className={styles.page}>
                    <Route exact path={this.props.match.url} component={Home} />
                    <Route path={`${this.props.match.url}/about`} component={About} />
                </main>
                <Footer />
            </div>
        )
    }
}




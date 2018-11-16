import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styles from './AppContainer.scss'

import AppHeader from '../../component/AppHeader/AppHeader'
import AppFooter from '../../component/AppFooter/AppFooter'
import Link from '../../component/Link/Link'
import CheckboxWithLabel from '../../component/CheckboxWithLabel/CheckboxWithLabel'


export default class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'soladidadi'
        }
    }
    render() {
        return (
            <div className={styles.body}>
                <AppHeader />
                <main className={styles.page}>
                    <p>hello,{this.state.name}...some components below go to testing</p>
                    <br />
                    <Link>aaaaa</Link>
                    <br />
                    <CheckboxWithLabel labelOn={'开'} labelOff={'关'} />
                </main>
                <AppFooter />
            </div>
        )
    }
}




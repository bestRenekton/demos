import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styles from './AppContainer.scss'
// import AppHeader from '../../component/AppHeader/AppHeader'
// import AppFooter from '../../component/AppFooter/AppFooter'
import Bundle from '../../router/bundle'

//异步加载
const CallContainer = (props) => (
    <Bundle load={() => import('../CallContainer/CallContainer')}>
        {(CallContainer) => <CallContainer {...props} />}
    </Bundle>
);
const TalkContainer = (props) => (
    <Bundle load={() => import('../TalkContainer/TalkContainer')}>
        {(TalkContainer) => <TalkContainer {...props} />}
    </Bundle>
);
const DeskContainer = (props) => (
    <Bundle load={() => import('../DeskContainer/DeskContainer')}>
        {(DeskContainer) => <DeskContainer {...props} />}
    </Bundle>
);


export default class AppContainer extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     index: 0
        // }
    }
    componentDidMount() {
        let LOADING = document.getElementById('LOADING');
        if (LOADING) {
            LOADING.parentNode.removeChild(LOADING);
        }
    }
    render() {
        return (
            <div className={styles.page}>
                <Route exact path="/" component={CallContainer} />
                {/* <Route path="/call" component={CallContainer} /> */}
                <Route path="/talk" component={TalkContainer} />
                <Route path="/desk" component={DeskContainer} />
                {/* <Route path="*" component={CallContainer} /> */}
            </div>
        )
    }
}




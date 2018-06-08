import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';


import styles from './AppContainer.scss'
// import AppHeader from '../../component/AppHeader/AppHeader'
// import AppFooter from '../../component/AppFooter/AppFooter'
import Player from '../../component/Player/Player'

import TestContainer from '../TestContainer'

//异步加载
import Bundle from '../../router/bundle'
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
const PhoneContainer = (props) => (
    <Bundle load={() => import('../PhoneContainer/PhoneContainer')}>
        {(PhoneContainer) => <PhoneContainer {...props} />}
    </Bundle>
);
const MapContainer = (props) => (
    <Bundle load={() => import('../MapContainer/MapContainer')}>
        {(MapContainer) => <MapContainer {...props} />}
    </Bundle>
);

class AppContainer extends Component {
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
        // console.log(this)
        return (
            <div className={styles.page}>
                <Player music={this.props.app.music} />
                <Route exact path="/" component={CallContainer} />
                {/* <Route path="/call" component={CallContainer} /> */}
                <Route path="/talk" component={TalkContainer} />
                <Route path="/desk" component={DeskContainer} />
                <Route path="/map" component={MapContainer} />
                <Route path="/phone" component={PhoneContainer} />
                <Route path="/test" component={TestContainer} />


                {/* <Route path="*" component={CallContainer} /> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    app: state.app,
})
// const mapDispatchToProps = {
//     toggleMusic: toggleMusic
// }

export default AppContainer = connect(mapStateToProps)(AppContainer);




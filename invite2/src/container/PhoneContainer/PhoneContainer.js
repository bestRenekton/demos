import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { toggleMusic } from '../../actions/index'


import styles from './PhoneContainer.scss'

class PhoneContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
    // go(url) {
    //     this.props.history.push({
    //         pathname: `/${url}`
    //     });
    // }
    render() {
        console.log(this)
        return (
            <p style={{ height: '100%', background: '#ddd' }}>1</p>
        )
    }
}

const mapStateToProps = (state) => ({
    // talk: state.talk,
})
const mapDispatchToProps = {
    toggleMusic: toggleMusic
}

PhoneContainer = connect(mapStateToProps, mapDispatchToProps)(PhoneContainer);
export default withRouter(PhoneContainer);


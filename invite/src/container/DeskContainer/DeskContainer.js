import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import styles from './DeskContainer.scss';
// import BgImg from '../../component/BgImg/BgImg';
// import imgBg from './img/bg.jpg';


class DeskContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }
    componentDidMount() {

    }
    goDesk() {
        this.props.history.push({
            pathname: '/desk'
        });
    }
    render() {
        return (
            <p>deskkkkkkk</p>
        )
    }
}

export default withRouter(DeskContainer);

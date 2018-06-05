import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import styles from './TalkContainer.scss';
import BgImg from '../../component/BgImg/BgImg';
import imgBg from './img/bg.jpg';
import imgBtns from './img/function.png';
import imgHungUp from './img/hung-up.png';

class TalkContainer extends Component {
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
            [
                <BgImg src={imgBg} animate={true} key={0} />,
                <div className={styles.content} key={1}>
                    <img className={styles.btns} src={imgBtns} />
                    <img className={styles.hungUp} src={imgHungUp} onClick={() => this.goDesk()} />
                </div>
            ]
        )
    }
}

export default withRouter(TalkContainer);

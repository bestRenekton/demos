import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { toggleMusic } from '../../actions/index'

import styles from './CallContainer.scss';
import BgImg from '../../component/BgImg/BgImg';
import imgBg from '../../public/img/bg.jpg';
import imgMessage from './img/message.png'
import imgTip from './img/tip.png'
import imgRefuse from './img/refuse.png'
import imgAnswer from './img/answer.png'

class CallContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        let LOADING = document.getElementById('LOADING');
        if (LOADING) {
            LOADING.parentNode.removeChild(LOADING);
        }

        if (this.props.app.music != 'call') {
            this.props.toggleMusic('call')
        }
    }
    

    answer() {
        this.props.history.push({
            pathname: '/talk'
        });
    }
    render() {
        return (
            [
                <BgImg src={imgBg} animate={true} key={0} />,
                <div className={styles.content} key={1}>
                    <div className={styles.content_top}>
                        <img className={styles.btn} src={imgMessage} alt="" />
                    </div>
                    <div className={styles.content_down}>
                        <img className={styles.btn} src={imgTip} alt="提醒我" />
                        <img className={styles.btn} src={imgMessage} alt="消息" />
                        <img className={styles.btn} src={imgRefuse} alt="拒绝" />
                        <img className={`${styles.btn} ${styles.answer}`}
                            onClick={() => { this.answer(); }}
                            src={imgAnswer} alt="接听"
                        />
                    </div>
                </div>
            ]
        )
    }
}

const mapStateToProps = (state) => ({
    app: state.app,
})
const mapDispatchToProps = {
    toggleMusic: toggleMusic
}

CallContainer = connect(mapStateToProps, mapDispatchToProps)(CallContainer);
export default withRouter(CallContainer);

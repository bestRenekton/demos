import React, { Component } from 'react';
import styles from './CallContainer.scss';
import BgImg from '../../component/BgImg/BgImg';
import imgBg from './img/bg.jpg'
import imgMessage from './img/message.png'
import imgTip from './img/tip.png'
import imgRefuse from './img/refuse.png'
import imgAnswer from './img/answer.png'

export default class CallContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }
    componentDidMount() {
        let LOADING = document.getElementById('LOADING');
        LOADING.parentNode.removeChild(LOADING);
    }
    render() {
        return (
            <div className={styles.page}>
                <BgImg src={imgBg} animate={true} />
                <div className={styles.content}>
                    <div className={styles.content_top}>
                        <img className={styles.btn} src={imgMessage} alt="" />
                    </div>
                    <div className={styles.content_down}>
                        <img className={styles.btn} src={imgTip} alt="提醒我" />
                        <img className={styles.btn} src={imgMessage} alt="消息" />
                        <img className={styles.btn} src={imgRefuse} alt="拒绝" />
                        <img className={`${styles.btn} ${styles.answer}`} src={imgAnswer} alt="接听" />
                    </div>
                </div>
            </div>
        )
    }
}
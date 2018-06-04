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
    render() {
        return (
            <div className={styles.page}>
                <BgImg src={imgBg} animate={true} />
                <div className={styles.content}>
                    <div className={styles.content_top}>
                        <img src={imgMessage} alt="" />
                    </div>
                    <div className={styles.content_down}>
                        <img src={imgTip} alt="提醒我" />
                        <img src={imgMessage} alt="消息" />
                        <img src={imgRefuse} alt="拒绝" />
                        <img src={imgAnswer} alt="接听" />
                    </div>
                </div>
            </div>
        )
    }
}
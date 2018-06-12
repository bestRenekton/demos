import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { toggleMusic } from '../../actions/index'

import styles from './TalkContainer.scss';
import BgImg from '../../component/BgImg/BgImg';
import imgBg from '../../public/img/bg.jpg';
import imgBtns from './img/function.png';
import imgHungUp from './img/hung-up.png';

class TalkContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inviteDate: this.props.app.inviteDate,
            daojishi: null
        }
    }
    componentWillMount() {
        // if (this.props.app.music != 'talk') {
        //     this.props.toggleMusic('talk')
        // }
    }
    componentDidMount() {
        this.timeID = setInterval(() => {
            this.tick();
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.timeID)
    }
    tick() {
        let nowDate = Math.round(new Date().getTime() / 1000);
        let inviteDate = this.state.inviteDate;
        let daojishi = inviteDate - nowDate;
        let day = Math.floor(daojishi / 86400);
        let hour = Math.floor((daojishi - day * 86400) / 1440);
        let minute = Math.floor((daojishi - day * 86400 - hour * 1440) / 60);
        let second = Math.floor(daojishi - day * 86400 - hour * 1440 - minute * 60);

        daojishi = `${day}天${hour}小时${minute}分${second}秒`;
        this.setState({
            daojishi: daojishi
        })
    }
    goDesk() {
        this.props.history.push({
            pathname: '/desk'
        });
    }
    render() {
        // console.log(this.state.inviteDate)
        return (
            [
                <BgImg src={imgBg} animate={true} key={0} />,
                <div className={styles.content} key={1}>
                    {
                        this.state.daojishi ?
                            [
                                <p className={styles.title} key={0}>倒计时</p>,
                                <p className={styles.num} key={1}>{this.state.daojishi}</p>
                            ]
                            :
                            null
                    }
                    <img className={styles.btns} src={imgBtns} alt="btns"/>
                    <div className={styles.shadow}></div>
                    <img className={styles.hungUp} src={imgHungUp} onClick={() => this.goDesk()} alt="hungUp"/>
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

TalkContainer = connect(mapStateToProps, mapDispatchToProps)(TalkContainer);
export default withRouter(TalkContainer);

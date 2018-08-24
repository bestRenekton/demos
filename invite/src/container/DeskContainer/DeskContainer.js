import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { toggleMusic } from '../../actions/index'

import styles from './DeskContainer.scss';
import BgImg from '../../component/BgImg/BgImg';
import imgBg from '../../public/img/bg.jpg'
import imgDate from './img/1.png';
import imgVideo from './img/2.png';
import imgPhoto from './img/3.png';
import imgBless from './img/4.png';
import imgPhone from './img/5.png';
import imgWechat from './img/6.png';
import imgMessage from './img/7.png';
import imgMap from './img/8.png';


class DeskContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs_top: [
                { icon: imgDate, url: 'map', title: '日期' },
                { icon: imgVideo, url: 'map', title: '视频' },
                { icon: imgPhoto, url: 'map', title: '相册' },
                { icon: imgBless, url: 'map', title: '祝福' }
            ],
            tabs_bottom: [
                { icon: imgPhone, url: 'phone', title: '电话' },
                { icon: imgWechat, url: 'wechart', title: '微信' },
                { icon: imgMessage, url: 'message', title: '短信' },
                { icon: imgMap, url: 'map', title: '地图' }
            ]
        }
    }
    componentDidMount() {
        if (this.props.app.music != 'bgm') {
            this.props.toggleMusic('bgm')
        }
    }
    go(url) {
        this.props.history.push({
            pathname: `/${url}`
        });
    }
    render() {
        return (
            [
                <BgImg src={imgBg} animate={false} key={0} />,
                <iframe id="player" frameborder="no" key={2} border="0" marginwidth="0" marginheight="0" width='100%' height='110px' src="//music.163.com/outchain/player?type=0&id=2336290297&auto=0&height=90"></iframe>,
                <div className={styles.content} key={1}>
                    <div className={styles.content_top}>
                        {
                            this.state.tabs_top.map((val, i) => {
                                return (
                                    <div className={styles.grid} key={i}>
                                        <img src={val.icon} onClick={() => { this.go(val.url) }} alt={val.title} />
                                        <p className={styles.title}>{val.title}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.content_down}>
                        {
                            this.state.tabs_bottom.map((val, i) => {
                                return (
                                    <div className={styles.grid} key={i}>
                                        <img src={val.icon} onClick={() => { this.go(val.url) }} alt={val.title} />
                                    </div>
                                )
                            })
                        }
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

DeskContainer = connect(mapStateToProps, mapDispatchToProps)(DeskContainer);
export default withRouter(DeskContainer);
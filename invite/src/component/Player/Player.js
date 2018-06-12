import React, { Component } from 'react';
import styles from './Player.scss'
import { connect } from 'react-redux';

import music_call from '../../public/audio/calls.mp3'
import music_bg from '../../public/audio/bgm.mp3'
import music_talk from '../../public/audio/talk.mp3'
import music_wechat from '../../public/audio/wechat-boy.mp3'



class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: true,
            music: null,
            music_file: null
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log(nextProps.music, nextState)
        // if (this.props.music !== nextProps.music) {
        //     return true;			//更新
        // }
        // if (this.state.music !== nextState.music) {
        //     return true;			//更新
        // }
        return false;      //不更新
    }
    // componentWillReceiveProps(nextProps) {
    //     let music_title = nextProps.music;
    //     let music_file = null;

    //     // console.log(music_title)
    //     if (music_title == this.state.music) {
    //         document.getElementById('PLAYER').load();//重载
    //         return
    //     }
    //     switch (music_title) {//切歌
    //         case 'bgm':
    //             music_file = music_bg;
    //             break
    //         case 'call':
    //             music_file = music_call;
    //             break
    //         case 'talk':
    //             music_file = music_talk;
    //             break
    //         case 'wechat':
    //             music_file = music_wechat;
    //             break
    //     }
    //     this.setState({ music_file: music_file });
    //     document.getElementById('PLAYER').load();//重载
    // }
    toggle() {//暂停
        let play = this.state.play;
        let PLAYER = document.getElementById('PLAYER');

        if (play) {//暂停
            PLAYER.pause();
        } else {//播放
            PLAYER.play();
        }
        this.setState({
            play: !play
        })
    }
    render() {
        console.log(this)
        return (
            <div className={`${styles.player} ${this.state.play ? 'on' : ''}`} onClick={() => { this.toggle(); }}>
                <i className={styles.musicIcon}></i>
                <i className={styles.circle_1}></i>
                <i className={styles.circle_2}></i>
                <i className={styles.circle_3}></i>
                <audio id="PLAYER" autoPlay loop>
                    <source src={this.state.music_file} type="audio/mpeg" />
                </audio>
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

export default Player = connect(mapStateToProps)(Player);
// export default Player;
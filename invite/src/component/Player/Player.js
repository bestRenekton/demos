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

    static getDerivedStateFromProps(nextProps, prevState) {
        let music_title = nextProps.app.music;
        let music_file = null;

        // console.log(music_title, prevState.music)
        if (music_title != prevState.music) {
            switch (music_title) {//切歌
                case 'bgm':
                    music_file = music_bg;
                    break
                case 'call':
                    music_file = music_call;
                    break
                case 'talk':
                    music_file = music_talk;
                    break
                case 'wechat':
                    music_file = music_wechat;
                    break
            }

            return {
                music: music_title,
                music_file: music_file,
                play:true
            };

        }
        return null;
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (this.state.music != prevState.music) {
            return true
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {    
        if (snapshot !== null) {
            document.getElementById('PLAYER').load();//重载
        }
    }

    toggle() {//暂停
        let play = this.state.play;
        let PLAYER = document.getElementById('PLAYER');

        console.log(play)
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
        console.log('player_render------', this)
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

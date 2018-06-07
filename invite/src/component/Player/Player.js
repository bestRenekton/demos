import React, { Component } from 'react';

import styles from './Player.scss'

// import bgm from '../../public/audio/bgm.mp3'


class Close extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: true
        }
    }
    toggle() {
        let play = this.state.play;
        let PLAYER=document.getElementById('PLAYER');

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
        // console.log(this.props.play.music)
        return (
            <div className={`${styles.player} ${this.state.play ? 'on' : ''}`} onClick={() => { this.toggle(); }}>
                <i className={styles.musicIcon}></i>
                <i className={styles.circle_1}></i>
                <i className={styles.circle_2}></i>
                <i className={styles.circle_3}></i>
                <audio id="PLAYER" autoPlay loop>
                    <source src={this.props.music} type="audio/mpeg" />
                </audio>
            </div>
        )
    }
}


export default Close;
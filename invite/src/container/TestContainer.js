import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { handleAdd, toggleMusic } from '../actions/index'


import music_bg from '../public/audio/bgm.mp3'
import music_call from '../public/audio/calls.mp3'
import music_talk from '../public/audio/talk.mp3'
import music_wechat from '../public/audio/wechat-boy.mp3'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            music: music_bg
        }
    }
    componentWillMount() {

    }
    qiege(music_title ) {
        // document.getElementById('PLAYER').pause();

        let music=null;
        switch (music_title) {
            case 'bgm':
                music = music_bg;
                break
            case 'call':
                music = music_call;
                break
        }
        this.setState({ music: music });
        document.getElementById('PLAYER').load();
    }
    render() {
        return (
            <div>
                <p onClick={() => { this.qiege('bgm') }}>1111</p>
                <p onClick={() => { this.qiege('call') }}>22222</p>
                <p>{this.state.music}</p>
                <audio id="PLAYER" autoPlay loop controls>
                    <source src={this.state.music} type="audio/mpeg" />
                </audio>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    // app: state.app,
})
const mapDispatchToProps = {
    handleAdd: handleAdd,
    toggleMusic: toggleMusic

}

Test = connect(mapStateToProps, mapDispatchToProps)(Test);
export default withRouter(Test);
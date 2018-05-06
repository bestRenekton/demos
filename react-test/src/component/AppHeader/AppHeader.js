import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './AppHeader.scss';


export default class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1
        }
    }
    linkTo(e) {
        this.setState({
            index: e
        })
    }
    render() {
        return (
            <header className={styles.header}>
                <div className="wrapper">
                    <div className={styles.logo}>TaoLand</div>
                    <div className={styles.nav}>
                        <Link index="1" onClick={(e) => { this.linkTo(1) }} to="/" className={`${styles.link} ${this.state.index === 1 ? 'on' : ''}`}><i className="iconfont icon-home"></i>Home</Link>
                        <Link index="2" onClick={(e) => { this.linkTo(2) }} to="/archives" className={`${styles.link} ${this.state.index === 2 ? 'on' : ''}`}><i className="iconfont icon-archives"></i>Archives</Link>
                        <Link index="3" onClick={(e) => { this.linkTo(3) }} to="/demo" className={`${styles.link} ${this.state.index === 3 ? 'on' : ''}`}><i className="iconfont icon-play"></i>Demo</Link>
                        <Link index="4" onClick={(e) => { this.linkTo(4) }} to="/about" className={`${styles.link} ${this.state.index === 4 ? 'on' : ''}`}><i className="iconfont icon-meho"></i>About</Link>
                        <Link index="5" onClick={(e) => { this.linkTo(4) }} to="/admin" className={`${styles.link} ${this.state.index === 5 ? 'on' : ''}`}><i className="iconfont icon-meho"></i>admin</Link>
                    </div>
                </div>
            </header>
        )
    }
}
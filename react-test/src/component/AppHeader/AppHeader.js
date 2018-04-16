import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AppHeader.scss';


export default class AppHeader extends Component{
    constructor(props){
        super(props);
        this.state={
            index:0
        }
    }
    render(){
        return(
            <header className={styles.header}>
                <div className="wrapper">
                    <div className={styles.logo}>TaoLand</div>
                    <div className={styles.nav}>
                        <NavLink index="1" to="/" className={`${styles.link} ${this.state==1?'on':''}`}><i className="iconfont icon-home"></i>Home</NavLink>
                        <NavLink index="2" to="/Archives" className={styles.link}><i className="iconfont icon-archives"></i>Archives</NavLink>
                        <NavLink index="3" to="/Demo" className={styles.link}><i className="iconfont icon-play"></i>Demo</NavLink>
                        <NavLink index="4" to="/About" className={styles.link}><i className="iconfont icon-meho"></i>About</NavLink>
                    </div>
                </div>
            </header>
        )
    }
}
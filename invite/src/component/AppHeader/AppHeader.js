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
                <div>hhhhhhhhhhhhh</div>
            </header>
        )
    }
}
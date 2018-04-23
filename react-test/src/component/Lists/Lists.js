import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import styles from './Lists.scss';
import { webUrl } from "../../public/js/public"



/**
 * 首页主列表
 */
class List_home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: []
        }
    }
    componentWillMount() {
        axios.post(webUrl + 'api/articleList')
            .then((res) => {
                this.setState({
                    arr: res.data
                })
            }).catch((err) => {
                console.log(err.status);
            })
    }
    componentDidMount() {

    }
    render() {
        let arr = this.state.arr;

        return (
            <ul className={styles.list_home}>
                {
                    arr.map((e, i) => {
                        return (
                            <li key={i} className={styles.card}>
                                <Link to={`/detail/${e._id}`}>
                                    <p className={styles.card_title}>{e.title}</p>
                                    <p className={styles.gist}>{e.gist}</p>
                                </Link>
                                <p className={styles.date}>{e.date}</p>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}
/**
 * archives列表
 */
class List_archives extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: []
        }
    }
    componentWillMount() {
        axios.post(webUrl + 'api/articleList', { type: 'archives' })
            .then((res) => {
                this.setState({
                    arr: res.data
                })
            }).catch((err) => {
                console.log(err.status);
            })
    }
    componentDidMount() {

    }
    render() {
        let arr = this.state.arr;
        return (
            <div className={styles.list_archives}>
                {
                    arr.map((e, i) => {
                        return (
                            <div key={i} className={styles.card}>
                                <p className={styles.card_title} id={`anchor-${e.type}`}>{e.type}</p>
                                <ul>
                                    e.list.map((e2,i2)=>{
                                        <li>{e2.date}</li>
                                    })
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}





/**
 * lists列表壳
 */
class Lists extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let type = this.props.type;

        switch (type) {
            case 'home':
                return <List_home />
                break;
            case 'archives':
                return <List_archives />
                break;
        }
    }
}
export default Lists;
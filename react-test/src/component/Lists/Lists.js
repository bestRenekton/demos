import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Lists.scss';




//首页主列表
class List_home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: []
        }
    }
    componentDidMount(){
        
    }
    render() {
        return (
            <div className="list_home">
                <p>list_home</p>
            </div>
        )
    }
}
//archives
class List_archives extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: []
        }
    }
    linkTo(e) {
        this.setState({
            index: e
        })
    }
    render() {
        return (
            <div className="list_home">
                <p>List_archives</p>
            </div>
        )
    }
}






//Lists
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
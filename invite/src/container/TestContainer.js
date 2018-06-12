import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { handleAdd, toggleMusic } from '../actions/index'


class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount() {

    }
    componentWillUpdate(){
        console.log(1231232132131)
        return false;
    }
    render() {
        console.log(123)
        return (
            <div>
               <p>asdfsadf</p>
            </div>
        )
    }
}

export default Test;
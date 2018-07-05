import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { handleAdd, toggleMusic } from '../actions/index'


// class Test extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         }
//     }
//     componentWillMount() {

//     }
//     shouldComponentUpdate(){
//         return false;
//     }
//     render() {
//         console.log(123)
//         return (
//             <div>
//                <p>asdfsadf</p>
//             </div>
//         )
//     }
// }
class Test extends Component {
    shouldComponentUpdate(){
        console.log('test-should')
        return false
    }
    render() {
        console.log('test-render')
        return (
            <div>
                <h2>Test</h2>
            </div>
        )
    }
}
export default Test;
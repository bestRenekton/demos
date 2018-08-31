import React, { Component } from 'react';
import Todo from '../ToDo/ToDo'
import PureCom from '../PureCom/PureCom'


const DemoObj={
    ToDo:Todo,
    PureCom:PureCom,
}

export default class Demo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                // {id:1,title:'asdfsdaf',status:1}
            ]
        }
    }
    render() {
        let DemoComponent=DemoObj[this.props.match.params.id]
        return (
            <div className="wrapper" style={{ background: '#fff', padding: '20px' }}>
            <DemoComponent />
                {/* {this.computer(this.props.match.params.id)} */}
            </div>
        )
    }
}




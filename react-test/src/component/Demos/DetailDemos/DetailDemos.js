import React, { Component } from 'react';
import Todo from '../ToDo/ToDo'
import Test from '../Test/Test'


const DemoObj={
    ToDo:Todo,
    Test:Test,
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
    // computer(id) {
    //     let com = null;
    //     switch (id) {
    //         case 'ToDo':
    //             com = <Todo />
    //             break;
    //     }
    //     return com
    // }
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




import React, { Component } from 'react';
import Todo from '../ToDo/ToDo'




export default class Demo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                // {id:1,title:'asdfsdaf',status:1}
            ]
        }
    }
    computer(id) {
        let com = null;
        switch (id) {
            case 'ToDo':
                com = <Todo />
                break;
        }
        return com
    }
    render() {
        return (
            <div className="wrapper" style={{ background: '#fff', padding: '20px' }}>
                {this.computer(this.props.match.params.id)}
            </div>
        )
    }
}




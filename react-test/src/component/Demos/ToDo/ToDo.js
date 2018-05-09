import React, { Component } from 'react';
import { Button, Input } from 'antd';
import { connect } from 'react-redux';
import {handleChange, handleAdd,handleEdit } from '../../../actions/index'


const InputGroup = Input.Group;
const List = ({ type, list, handleEdit }) => {
    switch (type) {
        case 1:
            return (
                list.map(val => {
                    return (
                        <div key={val.id}>
                            <span>{val.title}</span>
                            {val.status == 1
                                ?
                                <Button type="danger" onClick={() => { handleEdit(val.id, 0) }}>删除</Button>
                                :
                                <Button type="primary" onClick={() => { handleEdit(val.id, 1) }}>恢复</Button>
                            }
                        </div>
                    )
                })
            )
            break;
        case 2:
            return (
                list.map(val => {
                    if (val.status == 1) {
                        return (
                            <div key={val.id}>
                                <span>{val.title}</span>
                                <Button type="danger" onClick={() => { handleEdit(val.id, 0) }}>删除</Button>
                            </div>
                        )
                    }
                })
            )
            break;
        case 3:
            return (
                list.map(val => {
                    if (val.status == 0) {
                        return (
                            <div key={val.id}>
                                <span>{val.title}</span>
                                <Button type="primary" onClick={() => { handleEdit(val.id, 1) }}>恢复</Button>
                            </div>
                        )
                    }
                })
            )
            break;
    }
}

class ToDo extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     list: [
        //         // {id:1,title:'asdfsdaf',status:1}
        //     ],
        //     input: null,
        // }
    }
    // handleChange(val) {
    //     this.setState({ input: val })
    // }
    // handleAdd() {
    //     let val = this.state.input;
    //     let list = this.state.list;
    //     let index = list.length + 1;

    //     this.props.dispatch(addTodo(val))
    //     if (val) {
    //         list.push({ id: index, title: val, status: 1 });
    //         this.setState({ list: list }, () => console.log(this.state.list))
    //     } else {
    //         alert('不能为空')
    //     }
    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.props.list !== nextProps.list) {
    //       return true;
    //     }
    //     if (this.props.input !== nextProps.input) {
    //       return true;
    //     }
    //     return false;
    //   }
    // handleEdit(id, status) {
    //     let list = this.state.list;

    //     list.find(data => data.id === id).status = status;
    //     this.setState({ list: list })
    // }
    render() {
        console.log(this.props)
        return (
            <div className="wrapper">
                <div style={{ width: '800px' }}>
                    <h1>toDoList</h1>
                    <div>
                        <InputGroup compact>
                            <Input
                                onChange={(e) => { this.props.handleChange(e.target.value) }}
                                onPressEnter={() => { this.props.handleAdd() }}
                                style={{ width: '50%' }}
                            />
                            <Button onClick={() => { this.props.handleAdd() }}>添加</Button >
                        </InputGroup>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                            <p>全部</p>
                            <List list={this.props.list} handleEdit={(id, status) => { this.handleEdit(id, status) }} type={1} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <p>剩余</p>
                            <List list={this.props.list} handleEdit={(id, status) => { this.handleEdit(id, status) }} type={2} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <p>删除</p>
                            <List list={this.props.list} handleEdit={(id, status) => { this.handleEdit(id, status) }} type={3} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state) => ({
    list: state.todos.list,
    input: state.todos.input
})
const mapDispatchToProps = {
    handleChange: handleChange,
    handleAdd:handleAdd,
    handleEdit:handleEdit
}
export default ToDo = connect(mapStateToProps, mapDispatchToProps)(ToDo);



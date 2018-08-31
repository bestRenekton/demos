import React, {Component, PureComponent } from 'react';
import { Button, Input } from 'antd';
import { connect } from 'react-redux';
import { handleAdd, handleEdit } from '../../../actions/index'


const InputGroup = Input.Group;
const List = (props) => {
    let { type, list, handleEdit } = props;
    switch (type) {
        case 1:
            return (
                list.map(val => {
                    return (
                        <div key={val.id}>
                            <span>{val.title}</span>
                            {val.status === 1
                                ?
                                <Button type="danger" onClick={() => { handleEdit(val.id, 0) }}>删除</Button>
                                :
                                <Button type="primary" onClick={() => { handleEdit(val.id, 1) }}>恢复</Button>
                            }
                        </div>
                    )
                })
            )
        case 2:
            return (
                list.map(val => {
                    if (val.status === 1) {
                        return (
                            <div key={val.id}>
                                <span>{val.title}</span>
                                <Button type="danger" onClick={() => { handleEdit(val.id, 0) }}>删除</Button>
                            </div>
                        )
                    }
                })
            )
        case 3:
            return (
                list.map(val => {
                    if (val.status === 0) {
                        return (
                            <div key={val.id}>
                                <span>{val.title}</span>
                                <Button type="primary" onClick={() => { handleEdit(val.id, 1) }}>恢复</Button>
                            </div>
                        )
                    }
                })
            )
        default:
            return
    }
}
class Lists extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleEdit = this.handleEdit.bind(this)
    }
    handleEdit(id, status) {
        this.props.handleEdit(id, status)
    }
    render() {
        console.log('lists', this.props)
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <p>全部</p>
                    <List list={this.props.list} handleEdit={this.handleEdit} type={1} />
                </div>
                <div style={{ flex: 1 }}>
                    <p>剩余</p>
                    <List list={this.props.list} handleEdit={this.handleEdit} type={2} />
                </div>
                <div style={{ flex: 1 }}>
                    <p>删除</p>
                    <List list={this.props.list} handleEdit={this.handleEdit} type={3} />
                </div>
            </div>
        )
    }
}

class ToDo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    handleChange(e) {
        this.setState({ input: e.target.value })
    }
    handleAdd() {
        this.props.handleAdd(this.state.input)
    }
    handleEdit(id, status) {
        this.props.handleEdit(id, status)
    }
    render() {
        console.log('todo')
        return (
            <div className="wrapper">
                <div style={{ width: '800px' }}>
                    <h1>ddfae</h1>
                    <div>
                        <InputGroup compact>
                            <Input
                                onChange={this.handleChange}
                                onPressEnter={this.handleAdd}
                                style={{ width: '50%' }}
                            />
                            <Button onClick={this.handleAdd}>添加</Button >
                        </InputGroup>
                    </div>
                    <Lists list={this.props.list} handleEdit={this.handleEdit} />
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state) => ({
    list: state.todos.list,
})
const mapDispatchToProps = {
    handleAdd: handleAdd,
    handleEdit: handleEdit
}
export default ToDo = connect(mapStateToProps, mapDispatchToProps)(ToDo);



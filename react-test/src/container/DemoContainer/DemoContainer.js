import React, { Component } from 'react';


const List = ({ type, list, handleEdit }) => {
    // let type = props.type;
    // let list = props.list;

    // console.log(props)
    switch (type) {
        case 1:
            return (
                list.map(val => {
                    return (
                        <div key={val.id}>
                            <span>{val.title}</span>
                            {val.status == 1
                                ?
                                <button onClick={() => { handleEdit(val.id, 0) }}>删除</button>
                                :
                                <button onClick={() => { handleEdit(val.id, 1) }}>恢复</button>
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
                                <button onClick={() => { handleEdit(val.id, 0) }}>删除</button>
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
                                <button onClick={() => { handleEdit(val.id, 1) }}>恢复</button>
                            </div>
                        )
                    }
                })
            )
            break;
    }
}
// const Item=({val})=>{
//     return()
// }

export default class Demo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                // {id:1,title:'asdfsdaf',status:1}
            ]
        }
        // this.handleEdit=this.handleEdit.bind(this)
    }

    handleAdd() {
        let val = this.refs.input.value;
        let list = this.state.list;
        let index = list.length + 1;

        if (val) {
            list.push({ id: index, title: val, status: 1 });
            this.setState({ list: list }, () => console.log(this.state.list))
        } else {
            alert('不能为空')
        }
    }
    handleEdit(id, status) {
        let list = this.state.list;

        list.find(data => data.id === id).status = status;
        this.setState({ list: list })
    }

    render() {
        return (
            <div className="wrapper">
                <div style={{ width: '800px' }}>
                    <h1>toDoList</h1>
                    <div>
                        <input type="text" ref="input" />
                        <button onClick={() => { this.handleAdd() }}>添加</button>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                            <p>全部</p>
                            <List list={this.state.list} handleEdit={(id, status) => { this.handleEdit(id, status) }} type={1} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <p>剩余</p>
                            <List list={this.state.list} handleEdit={(id, status) => { this.handleEdit(id, status) }} type={2} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <p>删除</p>
                            <List list={this.state.list} handleEdit={(id,status) => { this.handleEdit(id,status) }} type={3} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}




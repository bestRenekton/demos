import React, { Component } from 'react';
import { Button, Input } from 'antd';

const InputGroup = Input.Group;

// var LikeButton = React.createClass({
//     getInitialState: function() {
//       return {liked: false};
//     },
//     handleClick: function(event) {
//       this.setState({liked: !this.state.liked});
//     },
//     render: function() {
//       var text = this.state.liked ? 'like' : 'haven\'t liked';
//       return (
//         <p onClick={this.handleClick}>
//           You {text} this. Click to toggle.
//         </p>
//       );
//     }
//   });

// class LikeButton extends Component {
//     constructor(props) {
//         super(props)
//         this.state = { like: false }
//     }
//     handleClick() {
//         this.setState({ like: !this.state.like })
//     }
//     render() {
//         let text = this.state.like ? 'like' : 'don\'t like';
//         return (
//             <p onClick={() => { this.handleClick() }}>you {text} this.click to toggle</p>
//         )
//     }
// }
// const LikeButton=(props)=>{
//     let text = props.like ? 'like' : 'don\'t like';

//     return(
//         <p onClick={props.handleClick}>you {text} this.click to toggle</p>
//     )
// }

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

export default class Demo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                // {id:1,title:'asdfsdaf',status:1}
            ],
            input: null,
            like:false
        }
        // this.handleEdit=this.handleEdit.bind(this)
    }
    handleChange(val) {
        this.setState({ input: val })
    }
    handleAdd() {
        let val = this.state.input;
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
                        <InputGroup compact>
                            <Input
                                onChange={(e) => { this.handleChange(e.target.value) }}
                                onPressEnter={() => { this.handleAdd() }}
                                style={{ width: '50%' }}
                            />
                            <Button onClick={() => { this.handleAdd() }}>添加</Button >
                        </InputGroup>
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
                            <List list={this.state.list} handleEdit={(id, status) => { this.handleEdit(id, status) }} type={3} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}




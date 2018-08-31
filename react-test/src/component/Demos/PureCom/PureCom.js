import React, { Component, PureComponent } from 'react';
import update from 'immutability-helper';
import { Object } from 'core-js';

class PureCom extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      items: [1, 2, 3],
      title: 'pure',
    }
    this.add = this.add.bind(this);
  }
  add() {
    let { items } = this.state;
    // items.push(23);
    //方法1：
    // let  items  = JSON.parse(JSON.stringify(this.state.items));
    //方法2：
    // items=items.concat(23)
    // let obj = { a: 1 }
    // let c = Object.assign({}, obj, { a: 2 })
    // console.log(obj)//{a: 1}
    // console.log(c)//{a: 2}
    //方法3：
    items = update(items, { $push: [23] });
    this.setState({ items })
  }
  render() {
    console.log('pure render')
    return (
      <div>
        <Title title={this.state.title} />
        <ul>
          {this.state.items.map((e, i) => {
            return <li key={i}>{e}</li>
          })}
        </ul>
        <button onClick={this.add}>add</button>
      </div>
    )
  }
}

class Title extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('title render')
    return (
      <div>{this.props.title}</div>
    )
  }
}

export default PureCom









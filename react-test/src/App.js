import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 0
    }
    // 我们可以通过 bind 方法手动绑定 this
    // this.add = this.add.bind(this)
  }
  add=()=>{
    this.setState({
      num: this.state.num+1
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.props.name}</h1>
        </header>
        <p className="App-intro">
          <code onClick={this.add}>{this.state.num}</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

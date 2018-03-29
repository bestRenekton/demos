import React, { Component } from 'react';
import logo from './img/logo.svg';
import './App.css';

class Clock extends Component{
  constructor(props){
    super(props)
    this.state={
      date:new Date()
    }
  }
  componentDidMount() {
    this.timeID=setInterval(()=>{
      this.tick();
    },1000)
  }

  componentWillUnmount() {
    clearInterval(this.timeID)
  }
  tick(){
    this.setState({
      date:new Date()
    })
  }
  render(){
    return(
      <h2>{this.state.date.toLocaleTimeString()}</h2>
    )
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      user:{
        firstName: 'Harper',
        lastName: 'Perez'
      }
    }
  }
  
  formater(e){
    return e.firstName
  }

  render() {  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome{this.formater(this.state.user)}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Clock />
      </div>
    );
  }
}

export default App;

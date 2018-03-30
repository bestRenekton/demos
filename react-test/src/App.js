import React, { Component } from 'react';
import logo from './img/logo.svg';
import './App.css';

class Clock extends Component{
  constructor(props){
    super(props)
    this.state={
      date:new Date(),
      num:0
    }
    // this.add = this.add.bind(this);
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
  add(e){
    // this.setState({
    //   num:this.state.num+1
    // })
    // this.setState({
    //   num:this.state.num+1
    // })
    this.setState((prev,prop)=>({num:prev.num+e}))
    // this.setState((prev,prop)=>({num:prev.num+1}))
  }
  // add=(e)=>{
  //   this.setState((prev,prop)=>({num:prev.num+e}))
  // }
  render(){
    return(
      <div>
        <h2>{this.state.date.toLocaleString()}</h2>
        {/* <p onClick={this.add()}>{this.state.num}</p> */}
        {/* <p onClick={this.add.bind(this)}>{this.state.num}</p> */}
        <p onClick={()=>{this.add(1)}}>{this.state.num}</p>
      </div>
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
        <Clock />
      </div>
    );
  }
}

export default App;

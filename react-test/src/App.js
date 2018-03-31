import React, { Component } from 'react';
import logo from './img/logo.svg';
import './App.css';


const numbers=[1,1,2,3]

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
    if(this.props.show){
      return(
        <div>
          <h2>{this.state.date.toLocaleString()}</h2>
          <p onClick={()=>{this.add(1)}}>{this.state.num}</p>
          <ul>
            {this.props.num.map((e,i)=>{
              return <li key={i}>{e}</li>
            })}
          </ul>
        </div>
      )
    }else{
      return(
        <div>
          <h2>{this.state.date.toLocaleString()}</h2>
        </div>
      )
    }
  }
}
//选择
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
//多个input
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(name)
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
        <input type="text" value="asdfsdf"/>
        <input type="text" value={null}/>
      </form>
    );
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
        <Clock show={false} num={numbers} />
        <Clock show={true} num={numbers} />
        <FlavorForm />
        <Reservation />
      </div>
    );
  }
}

export default App;

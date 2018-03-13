import React, { Component } from 'react';

class YuanInput extends React.Component {
  constructor(props) {
    super(props)
  }
  handleChange(event) {
    this.props.handleChange(event)
  }
  render() {
    return (
      <p>
        <label>
          人民币
          <input name='yuan' onChange={(e)=>this.handleChange(e)} value={this.props.money} />
        </label>
      </p>
    )
  }
}

const MoneyConvertor = props => (
  <p><label>
    {props.type}
    <input name={props.unit} value={(props.money*props.rate).toFixed(2)} disbled='true' />
  </label></p>
)

class CurrencyConvertor extends React.Component {
  constructor() {
    super()
    this.state = {
      money : 100
    }
  }
  handleInputChange(event) {
    this.setState({
      money: event.target.value
    })
  }
  render() {
    return (
    <div>
        <h2>汇率转换</h2>
        <YuanInput money={this.state.money} handleChange={(e) => this.handleInputChange(e)} />
        <MoneyConvertor type='美元' unit='dollar' money={this.state.money} rate={0.1453} />
        <MoneyConvertor type='日元' unit='yen' money={this.state.money} rate={16.1814} />
    </div>
    )
  }
}
 

 


export default CurrencyConvertor;

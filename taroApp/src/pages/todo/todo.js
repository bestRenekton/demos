import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import './todo.scss'

export default class Todo extends Component {

  config = {
    navigationBarTitleText: 'TodoList'
  }
  constructor(props) {
    super(props)
    this.state = {
      list: ['aaaaa', 'bbbb', 'c', 'dd'],
      inputVal: null
    }
    this.inputHandler = this.inputHandler.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  componentWillMount() { }
  componentDidMount() { }
  componentWillUnmount() { }
  componentDidShow() { }
  componentDidHide() { }

  inputHandler(e) {
    this.setState({
      inputVal: e.detail.value
    })
  }
  addItem() {
    let { inputVal, list } = this.state;
    list = list.concat(inputVal);
    this.setState({
      inputVal: null,
      list
    })
  }
  removeItem(index) {
    let { list } = this.state;
    list.splice(index, 1);
    this.setState({
      list
    })
  }
  render() {
    let { list, inputVal } = this.state
    return (
      <View className='todo'>
        <View className='todo_title'>TodoList</View>
        <View className='todo_head'>
          <Input className='input' type='text' value={inputVal} onInput={this.inputHandler} />
          <Text className='addBtn' onClick={this.addItem}>添加</Text>
        </View>
        <View className='todo_body'>
          {
            list.map((e, i) => {
              return (
                <View key={i}>{e} <Text onClick={this.removeItem.bind(this, i)} className='delBtn'>删除</Text></View>
              )
            })
          }
        </View>
      </View>
    )
  }
}








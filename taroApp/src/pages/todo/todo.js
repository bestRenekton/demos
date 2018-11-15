import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'


import { add, del } from '../../actions/todos'
import './todo.scss'




class Todo extends Component {
  config = {
    navigationBarTitleText: 'TodoList'
  }
  constructor(props) {
    super(props)
    this.state = {
      // list: ['aaaaa', 'bbbb', 'c', 'dd'],
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
    let { inputVal } = this.state;
    this.props.onAdd(inputVal);
  }
  removeItem(index) {
    this.props.onDel(index)
  }
  render() {
    let { inputVal } = this.state;
    let { list } = this.props;
    debugger
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
                <View key={e.id}>{e.text} <Text onClick={this.removeItem.bind(this, e.id)} className='delBtn'>删除</Text></View>
              )
            })
          }
        </View>
      </View>
    )
  }
}




const mapStateToProps = (state) => ({
  list: state.todos.list,
})
const mapDispatchToProps = {//传递函数要用on开头
  onAdd: add,
  onDel: del
}
export default Todo = connect(mapStateToProps, mapDispatchToProps)(Todo);







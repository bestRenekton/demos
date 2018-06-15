

import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

function hoc(ComponentClass) {
  return class HOC extends React.Component {
    componentDidMount() {
     // alert(1)
      console.log("hoc");
    }

    render() {
      const newProps={
        //name:"测试名称"
      }
      return <ComponentClass {...this.props} {...newProps}/>
    }
  }
}

// class MyComponent extends React.Component {
//   render() {
//     return <div></div>
//   }
// }
@hoc
export default class MyComponent extends React.Component {
  render() {
    return <div>{this.props.name}</div>
  }
}
//export default hoc(MyComponent);
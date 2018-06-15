import { Menu, Icon } from 'antd';
import HeadeTop from './header'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Tab extends React.Component {
  state = {
    current: 'mail',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <div>
        <HeadeTop/>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal" style={{position:"absolute",left:"50%",transform:"translate(-50%, 0)",marginTop:"20px"}}>
          <Menu.Item key="mail">
            <Icon type="mail" />表单设计
          </Menu.Item>
          <Menu.Item key="app">
            <Icon type="appstore" />数据管理
          </Menu.Item>
          <Menu.Item key="alipay">
            <Icon type="appstore" />表单设置
          </Menu.Item>
          <Menu.Item key="setting">
            <Icon type="appstore" />流程设定
          </Menu.Item>
        </Menu>
       </div>
    );
  }
}

export default Tab
import { Menu, Dropdown, Icon,Card ,Button} from 'antd';

class HeadeTop extends React.Component{
    render(){
        const menu = (
            <Menu>
                <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">用户名呢?</a>
                </Menu.Item>
                <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">账户中心</a>
                </Menu.Item>
                <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">注销</a>
                </Menu.Item>
            </Menu>
            );
        const menuCode = (
            <Card  style={{ width: 200 ,height:200}}>
                <div style={{fontSize:"100px"}}>♘</div>
            </Card>
        );
        return (
            <div style={{marginTop:"10px"}}> 
               <div style={{position:"absolute",left:"0",paddingLeft:"20px",}}>
                   <a href="" style={{fontSize: 16}}>
                        <Icon type="left" style={{ fontSize: 20, color: '#08c' }}/> 未命名表单
                   </a>
               </div>
                <div style={{position:"absolute",right:"0",paddingRight:"100px",}}> 
                    <a className="ant-dropdown-link" href="javascript:void(0);">
                        <Button type="primary" style={{margin:"10px"}}>成员管理</Button>
                    </a>
                     <Dropdown overlay={menuCode}>
                        <a className="ant-dropdown-link" href="#">
                        <Icon type="question-circle" style={{ fontSize: 20, color: '#08c' }}/>
                        </a>
                    </Dropdown>
                    <a className="ant-dropdown-link" href="#" style={{margin:"20px"}}>
                    <Icon type="cloud" style={{ fontSize: 20, color: '#08c' }}/>
                    </a>
                    <Dropdown overlay={menu} style={{margin:"20px"}}>
                        <a className="ant-dropdown-link" href="#">
                        <Icon type="bars" style={{ fontSize: 20, color: '#08c' }}/>
                        </a>
                    </Dropdown>
                </div>
            </div>
        )   
    }
}

export default HeadeTop
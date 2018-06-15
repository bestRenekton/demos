import { Tabs, Icon } from 'antd';
import React from 'react';
const TabPane = Tabs.TabPane;
class TabBar extends React.Component{
  componentDidMount(){
   
    }
    constructor(props){
      debugger
         super(props)
    }
    render(){
 return (
     <div>
     <Tabs defaultActiveKey="2">
        {this.props.Tabs.map(tab=> <TabPane tab={tab.Title} key={tab.Key} ></TabPane>)}
     </Tabs>
     </div>
 )
    }
}


export default TabBar;  
import React,{Component} from "react";
import { connect } from 'dva';

class Cooperate extends Component{
    constructor(props){
        super(props);
        this.state = {};
        console.log(this.props);
    }
    render(){
        return (
            <div>
                测试
            </div>
        );
    }
}
export default Cooperate;
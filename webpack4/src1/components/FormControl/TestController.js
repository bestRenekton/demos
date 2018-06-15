import React from 'react';
import { connect } from 'dva';
import { Input } from 'antd';



function TestController(props) {
    let { mode, index, dispatch, ...data } = props;
    function handleChange(e) {
        dispatch({
            type: 'formBuilder/setData',
            index: index,
            Data: { value: e.target.value }
        });
    }
    switch (mode) {
        case 'middle':
            return <div><Input disabled /></div>;
        case 'right':
            return <div><Input onChange={handleChange} {...data} /></div>;
        default:
            return <div>控件加载失败</div>;
    }
}

/*class TestController extends React.Component {
    constructor() {
        super();
    }
    render() {
        switch (this.props.mode) {
            case 'left':
                return <div>left</div>;
            case 'middle':
                return <div><Input disabled /></div>;
            case 'right':
                return <div><Input /></div>;
            default:
                return <div>控件加载失败</div>;
        }
    }
}*/
export default { key: "Test23", name: "测试控件1", ico: 'ico', Component: connect()(TestController), Data: { value: 1 } };
import React from 'react';
import { connect } from 'dva';
import { Checkbox, Input } from 'antd';

/*function TestController(props) {
    switch (props.mode) {
        case 'left':
            return <span>left</span>;
        case 'middle':
            return <span>middle</span>;
        case 'right':
            return <span>right</span>;
        default:
            return <span>error</span>;
    }
}*/

class TestController2 extends React.Component {
    constructor(props) {
        super(props);
        this.handleChnage = this.handleChnage.bind(this);
        this.handleChnage2 = this.handleChnage2.bind(this);
    }
    handleChnage() {
        this.props.dispatch({
            type: 'formBuilder/setData',
            index: this.props.index,
            Data: { checked: !this.props.checked }
        });
    }
    handleChnage2(e) {
        this.props.dispatch({
            type: 'formBuilder/setData',
            index: this.props.index,
            Data: { test: e.target.value }
        });
    }
    render() {
        let { mode, ...data } = this.props;
        switch (mode) {
            case 'middle':
                return <div><Checkbox readonly>test2 middle</Checkbox><span>{data.test}</span></div>;
            case 'right':
                return <div><Checkbox onChange={this.handleChnage} checked={data.checked} >test2 right</Checkbox>
                    <Input value={data.test} onChange={this.handleChnage2} />
                </div>;
            default:
                return <div>控件加载失败</div>;
        }
    }
}
export default { key: "Test2", name: "测试控件2",ico:'', Component: connect()(TestController2), Data: { checked: true, test: '123' } };
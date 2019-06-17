import React from 'react'
import { connect } from 'dva';
import Immutable, { Map, List, setIn } from 'immutable';


const initState = () => {
    return Immutable.fromJS({
        num: 0,
    })
};

@connect((state, ownProps) => {
    let { main, pageB } = state;
    let { currentRouter } = main;
    let { selfData, common } = pageB;

    //新增
    if (!selfData.get(currentRouter)) {
        let init = initState();
        pageB.selfData = selfData.set(currentRouter, init);
    }
    return {
        main: state.main,
        // pageB,
        selfData: pageB.selfData.get(currentRouter),
    }
})

class PageB extends React.Component {
    add = (currentRouter) => {
        this.props.dispatch({
            type: 'pageB/add',
            payload: { currentRouter: this.props.main.currentRouter }
        })
    }
    render() {
        console.log(this)
        const { selfData, main } = this.props;
        const { num } = selfData.toJS();

        return (
            <div onClick={this.add}>{num}</div>

        )
    }
}

export default PageB
import React from 'react'
import { connect } from 'dva';
import Immutable, { Map, List, setIn } from 'immutable';


const initState = () => {
    return Immutable.fromJS({
        num: 0,
    })
};

@connect((state, ownProps) => {
    let { main, pageA } = state;
    let { currentRouter } = main;
    let { selfData, common } = pageA;

    //新增
    if (!selfData.get(currentRouter)) {
        let init = initState();
        pageA.selfData = selfData.set(currentRouter, init);
    }
    return {
        main: state.main,
        // pageA,
        selfData: pageA.selfData.get(currentRouter),
    }
})

class PageA extends React.Component {
    add = (currentRouter) => {
        this.props.dispatch({
            type: 'pageA/add',
            payload: { currentRouter: this.props.main.currentRouter }
        })
    }
    render() {
        console.log(this)
        const { selfData,  main } = this.props;
        const { num } = selfData.toJS();

        return (
            <div onClick={this.add}>{num}</div>

        )
    }
}

export default PageA
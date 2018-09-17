import React from 'react'


//第一次
// father-render-----父组件render
// constructor-----子组件构造
// getDerivedStateFromProps-----props第一次传入子组件
// son-render-----子组件render
// DidMount-----子组件挂载完成

//更新，当props变化时候
// father-render-----父组件render
// getDerivedStateFromProps-----子组件接收到props变化
// shouldComponentUpdate-----判断是否更新
// son-render-----子组件render
// getSnapshotBeforeUpdate-----render之后，dom更新之前被调用
// componentDidUpdate-----这里可以获取dom做一些操作，比如重回高度，重置播放器

//自己state更新时候
// shouldComponentUpdate-----子组件自己state变化，是否更新
// son-render-----子组件render
// getSnapshotBeforeUpdate-----render之后，dom更新之前被调用
// componentDidUpdate-----这里可以获取dom做一些操作，比如重回高度，重置播放器

//卸载组件时候
//WillUnmount

class Son extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            propsNum: null,//getDerivedStateFromProps会在第一次挂载和重绘的时候都会调用到，因此基本不用在constructor里传入props
            stateNum: 0,
        }
        console.log('constructor')
    }
    componentDidMount() {//第一次render之后
        console.log('DidMount')
    }
    static getDerivedStateFromProps(nextProps, prevState) {//props变化，是否变化state,
        console.log('getDerivedStateFromProps')
        if (nextProps.propsNum !== prevState.propsNum) {
            return {
                propsNum: nextProps.propsNum,
            };
        }
        return false
    }
    shouldComponentUpdate(nextProps, nextState) {//props,state变化是否需要render
        console.log('shouldComponentUpdate')
        return (
            nextProps.propsNum != this.props.propsNum ||
            nextState.stateNum != this.state.stateNum
        )
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {//render之后，dom更新之前被调用
        console.log('getSnapshotBeforeUpdate')
        if (this.state.stateNum != prevState.stateNum) {
            return true
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {//组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。
        console.log('componentDidUpdate')
        if (snapshot !== null) {
            console.log("这里可以获取dom做一些操作，比如重回高度，重置播放器")
        }
    }
    componentWillUnmount() {//组件将要卸载时调用，一些事件监听和定时器需要在此时清除。
        console.log('WillUnmount')
        if (this._asyncRequest) {
            this._asyncRequest.cancel();
        }
    }
    render() {
        console.log('son-render')
        return (
            <div>
                <p onClick={() => { this.setState((prev, props) => ({ stateNum: prev.stateNum + 1 })) }}>son ADD</p>
                <div>stateNum{this.state.stateNum}</div>
                <div>propsNum{this.props.propsNum}</div>
            </div>
        )
    }
}

class Father extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 1
        }
    }

    render() {
        console.log('father-render')
        return (
            <div>
                <p onClick={() => { this.setState((prev, props) => ({ num: prev.num + 1 })) }}>Father ADD</p>
                <Son propsNum={this.state.num} />
            </div>
        )
    }
}

export default Father

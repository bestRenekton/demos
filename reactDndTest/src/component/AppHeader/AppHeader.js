import React, { Component } from 'react';
import {DropTarget} from 'react-dnd'


const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
}



/**
 * type
 * 当 source组件的type 和 target组件的type 一致时，target组件可以接受source组件。
 */
const types = {
    BOX: 'box',
}

/**
 *  事件--
 *  drop(props, monitor, component) 组件放下时触发的事件，可选。
    hover(props, monitor, component) 组件在DropTarget上方时响应的事件，可选。
    canDrop(props, monitor) 组件可以被放置时触发的事件，可选。

    参数--
    props： 组件当前的props
    monitor：查询当前的拖拽状态，比如当前拖拽的item和它的type，当前拖拽的offsets，当前是否dropped。具体获取方法，参看collect 参数 monitor 部分
    source组件 的 monitor 参数是 DragSourceMonitor 的实例
    target组件 的 monitor 参数是 DropTargetMonitor 的实例
 */
const boxTarget = {
    drop(props, monitor, component) {
        return { name: props.name }
    },
    // hover(props, monitor, component) {
    //     console.log(2222)
    // },
    // canDrop(props, monitor, component) {
    //     console.log(3333)
    // },
}

/**
 * 
    collect 是一个函数，默认有两个参数：connect 和 monitor。
    collect函数将返回一个对象，这个对象会注入到组件的 props 中，也就是说，我们可以通过 this.props 获取collect返回的所有属性。
    monitor 用于查询当前的拖拽状态，其对应实例内置了很多方法。


    monitor.canDrop()         // 是否可被放置
    monitor.isOver(options)   // source是否在target上方
    monitor.getItemType()     // 拖拽组件type
    monitor.getItem()         // 当前拖拽的item
    monitor.getDropResult()   // 查询drop结果
    monitor.didDrop()         // source是否已经drop在target
    monitor.getInitialClientOffset()   // 拖拽组件初始拖拽时offset
    monitor.getInitialSourceClientOffset()
    monitor.getClientOffset() // 拖拽组件当前offset
    monitor.getDifferenceFromInitialOffset() // 当前拖拽offset和初始拖拽offset的差别
    monitor.getSourceClientOffset()
    */
const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
})



@DropTarget(
    types.BOX,
    boxTarget,
    collect
)
export default class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1
        }
    }
    render() {
        // console.log(this)
        const { canDrop, isOver, connectDropTarget } = this.props
        const isActive = canDrop && isOver

        let backgroundColor = '#222'
        if (isActive) {
            backgroundColor = 'darkgreen'
        } else if (canDrop) {
            backgroundColor = 'darkkhaki'
        }

        return (
            connectDropTarget &&
            connectDropTarget(
                <div style={{ ...style, backgroundColor }}>
                DropTarget
                    {isActive ? 'Release to drop' : 'Drag a box here'}
                </div>,
            )
        )
    }
}
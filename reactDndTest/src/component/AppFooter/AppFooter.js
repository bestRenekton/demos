import React, { Component } from 'react';
import { DragSource } from 'react-dnd'


const styles = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    margin: '2rem',
    cursor: 'move',
    float: 'left',
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
 *  beginDrag(props, monitor, component): 拖动开始时触发的事件，必须。返回跟props相关的对象。
    endDrag(props, monitor, component): 拖动结束时触发的事件，可选。
    canDrag(props, monitor):  当前是否可以拖拽的事件，可选。
    isDragging(props, monitor): 拖拽时触发的事件，可选。

    参数--
    props： 组件当前的props
    monitor：查询当前的拖拽状态，比如当前拖拽的item和它的type，当前拖拽的offsets，当前是否dropped。具体获取方法，参看collect 参数 monitor 部分
    source组件 的 monitor 参数是 DragSourceMonitor 的实例
    target组件 的 monitor 参数是 DropTargetMonitor 的实例
 */
const boxSource = {
    beginDrag(props, monitor, component) {
        console.log(monitor.getInitialClientOffset())
        return {
            name: props.name,
        }
    },

    endDrag(props, monitor) {
        console.log(monitor.getInitialClientOffset())

        const item = monitor.getItem()
        const dropResult = monitor.getDropResult()

        if (dropResult) {
            alert(`You dropped ${item.name} into ${dropResult.name}!`)
        }
    },
}
/**
 * 
    collect 是一个函数，默认有两个参数：connect 和 monitor。
    collect函数将返回一个对象，这个对象会注入到组件的 props 中，也就是说，我们可以通过 this.props 获取collect返回的所有属性。
    monitor 用于查询当前的拖拽状态，其对应实例内置了很多方法。


    monitor.canDrag()        // 是否能被拖拽
    monitor.isDragging()      // 是否正在拖拽
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
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
})



@DragSource(
    types.BOX,
    boxSource,
    collect
)
export default class AppFooter extends Component {
    render() {
        // console.log(this)

        const { isDragging, connectDragSource } = this.props
        const { name } = this.props
        const opacity = isDragging ? 0.4 : 1

        return (
            connectDragSource &&
            connectDragSource(<div style={{ ...styles,opacity:opacity }}>{name}DragSource</div>)
        )
    }
}
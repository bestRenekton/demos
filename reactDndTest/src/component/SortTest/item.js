import React from 'react';
import { DragSource, connectDragPreview, connectDropTarget, DropTarget } from 'react-dnd'


//dropSource
const boxSource = {
    beginDrag(props, monitor, component) {
        return {
            index: props.index,
        }
    },
    endDrag(props, monitor) {
    },
}
const collectSource = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
})


//target
const boxTarget = {
    drop(props, monitor, component) {
    },
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        // console.log(dragIndex, hoverIndex)
        if (dragIndex != hoverIndex) {
            props.onSort(dragIndex, hoverIndex)
        }
    },
    canDrop(props, monitor, component) {
    },
}
const collectTarget = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
})


@DragSource(
    'box',
    boxSource,
    collectSource
)
@DropTarget(
    'box',
    boxTarget,
    collectTarget
)

export default class SortItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        let { data, isDragging, connectDragSource, connectDragPreview, connectDropTarget } = this.props;
        return (
            connectDragPreview(
                connectDropTarget(
                    <div
                        style={{ width: 100, border: isDragging ? '1px dashed red' : '1px solid', padding: 5, marginBottom: 5 }}
                    >
                        {data.name}
                        {
                            connectDragSource(
                                <span style={{ float: 'right', fontSize: 20 }}>■</span>
                            )
                        }
                    </div>
                )
            )

        )
    }
}
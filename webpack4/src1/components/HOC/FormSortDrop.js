import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { findDOMNode } from 'react-dom';
import Immutable from 'immutable';

const dropTarget = {
    canDrop(props, monitor, component) {
        return props.IsContainer == true;
    },
    hover(props, monitor, component) {
        const item = monitor.getItem();
        if (props.index != item.index) {
            if (props.IsContainer) {
                const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
                const clientOffset = monitor.getClientOffset();
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;
                if (hoverClientY <= 15) {
                    moveFormItem(item, props.index, props.dispatch, true, 'top');
                }
                else if (hoverClientY >= (hoverBoundingRect.height - 15)) {
                    moveFormItem(item, props.index, props.dispatch, true, "bottom");
                }
                else {
                    const isOver = monitor.isOver({ shallow: true });
                    if (item.index != props.index && isOver) {
                        debugger
                        props.dispatch({
                            type: 'formBuilder/changeContainer',
                            index: item.index,
                            to: props.index
                        });
                    }
                }
            }
            else {
                moveFormItem(item, props.index, props.dispatch, false);
            }
        }
    }
};

function moveFormItem(item, hoverIndex, dispatch, isContainer, direction) {
    if (item.hasOwnProperty("name")) {
        if (hoverIndex !== item.index) {
            dispatch({
                type: 'formBuilder/moveFormItem',
                to: hoverIndex,
                frm: -1,
                isContainer: isContainer,
                direction: direction
            });
        }
    }
    else if (item.hasOwnProperty("index")) {
        if (hoverIndex !== item.index) {
            dispatch({
                type: 'formBuilder/moveFormItem',
                to: hoverIndex,
                frm: item.index,
                isContainer: isContainer,
                direction: direction
            });
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }
}

function WP(Component, wrapper) {
    return <Component WrappedComponent={wrapper} />
}

function FormSortDrop(Component) {
    return connect()(DropTarget('FormDrag', dropTarget, collect)(
        class extends React.Component {
            shouldComponentUpdate(nextProps, nextState) {
                /*const conf = this.props.dragIndex != nextProps.dragIndex || this.props.container != nextProps.container
                    || this.props.select != nextProps.select;
                if (this.props.IsContainer) {
                    const v = conf || this.props.panelBody.length != nextProps.panelBody.length;
                    return v;
                }
                else {
                    return conf;
                }*/
                return true;
                const v = Immutable.is(JSON.stringify(this.props), JSON.stringify(nextProps));
                console.log('FormSortDrop:' + !v);
                return !v;
            }
            render() {
                const { canDrop, isOver, connectDropTarget, ...other } = this.props;
                const isActive = canDrop && isOver;
                return connectDropTarget(<div><Component {...other} /></div>);
            }
        }))
}
export default FormSortDrop;
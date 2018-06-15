import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import styles from './form.less'
const dropTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    let obj = { type: 'formBuilder/endDragItem' };
    if (item.hasOwnProperty('name'))
      obj.name = item.name;
    else
      obj.index = item.index;
    props.dispatch(obj);
  },
  hover(props, monitor, component) {
    const item = monitor.getItem();
    if (item.hasOwnProperty('name') && props.dragIndex == -1) {
      props.dispatch({
        type: 'formBuilder/addFormItem',
        container: props.container,
        ...item
      });
    }
    else {
      const isOver = monitor.isOver({ shallow: true });
      if (isOver) {
        props.dispatch({
          type: 'formBuilder/changeContainer',
          index: item.index,
          to: props.container
        });
      }
    }
  }
};
@connect()
@DropTarget('FormDrag', dropTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class FormDropTarget extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
  };
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
    return connectDropTarget(
      <div className={styles.DropTarget} style={{ height: '100%' }}>
        {this.props.children}
      </div>
    );
  }
}
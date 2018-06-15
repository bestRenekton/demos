import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { Icon, Button, Row, Col, Popconfirm } from 'antd';
import { connect } from 'dva';
import styles from './form.less';
import com from '../../utils/com';
import Immutable from 'immutable';

const formDragType = 'FormDrag';
const spec = {
    beginDrag(props) {
        if (props.name) {
            return {
                name: props.name,
                index: com.Guid()
            }
        }
        else {
            props.dispatch({
                type: 'formBuilder/beginDragItem',
                index: props.index,
                container: props.container
            });
            return {
                index: props.index,
                container: props.container
            }
        }
    },
    endDrag(props, monitor) {
        const item = monitor.getItem();
        if (item.hasOwnProperty('index')) {
            if (!monitor.didDrop()) {
                props.dispatch({
                    type: 'formBuilder/cancelMoveFormItem',
                    index: props.index
                });
            }
        }
        else {
            if (!monitor.didDrop()) {
                props.dispatch({
                    type: 'formBuilder/cancelMoveFormItem'
                });
            }

        }
    }
};
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

function FormDragSource(nm, ico, Component) {
    return connect()(DragSource(formDragType, spec, collect)(
        class extends React.Component {
            shouldComponentUpdate(nextProps, nextState) {
                /*const conf = this.props.dragIndex != nextProps.dragIndex || this.props.container != nextProps.container
                    || this.props.isDragging != nextProps.isDragging || this.props.select != nextProps.select;
                if (this.props.IsContainer) {
                    const v = conf || this.props.panelBody.length != nextProps.panelBody.length;
                    return v;
                }
                else {
                    return conf;
                }*/
                return true;
                const v = Immutable.is(JSON.stringify(this.props), JSON.stringify(nextProps));
                if (this.IsContainer) {
                    return true;
                }
                //console.log('FormDragSource:' + !v);
                return !v;
            }
            Remove() {
                this.props.dispatch({
                    type: "formBuilder/removeFormItem",
                    index: this.props.index
                })
            }
            Copy(e) {
                this.props.dispatch({
                    type: "formBuilder/CopyFormItem",
                    index: this.props.index
                })
                e.stopPropagation();
            }
            render() {
                const { isDragging, connectDragSource, name, dragIndex, ...other } = this.props;
                const opacity = isDragging || (dragIndex == this.props.index) ? 0.3 : 1;
                if (Component)
                    return connectDragSource(
                        <div className={styles.ConItem} style={{ opacity: opacity, position: "relative", }}>
                            <Component dragIndex={dragIndex} {...other} />
                            {other.select ? <div className={styles.toolBar}>
                                <div title="复制" className={styles.toolItem} onClick={ele => this.Copy(ele)}>
                                    <Icon style={{ color: "#108ee9" }} type="copyright" />
                                </div>
                                <div title="删除" className={styles.toolItem} onClick={e => e.stopPropagation()} >
                                    <Popconfirm title='确定要删嘛?' onConfirm={() => this.Remove()}>
                                        <Icon style={{ color: "#d84636" }} type="delete" />
                                    </Popconfirm>
                                </div>
                            </div> : ""}
                        </div>);
                else
                    return connectDragSource(<div className={styles.leftControl}><Icon className={styles.leftIcon} type={ico} />{nm}</div>);
            }
        }));
}
export default FormDragSource;
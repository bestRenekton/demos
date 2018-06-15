import React from 'react';
import { connect } from 'dva';
import styles from './FormFocus.less';
import Immutable from 'immutable';

function Wrapper(props) {
    function handleClick(e) {
        if (props.currentIndex != props.index) {
            props.dispatch({
                type: 'formBuilder/setCurrent',
                index: props.index
            });
        }
        e.stopPropagation();
    }
    return <div onClick={handleClick} className={styles.FormItemContainer + (props.select ? ' ' + styles.Selected : '')}>
        <div className={styles.Wrapper}>
            {props.children}
        </div>
    </div>;
}

function FormFocus(WrappedComponent) {
    return connect()(
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
                console.log('FormFocus:' + !v);
                return !v;
            }
            render() {
                const { dispatch, select, index, container, CurrentIndex, ...data } = this.props;
                const pj = this.props.IsContainer ? { ...data, CurrentIndex: CurrentIndex } : { ...data };
                return <Wrapper dispatch={dispatch} select={select} currentIndex={CurrentIndex} index={index} container={container}>
                    <WrappedComponent index={index} {...pj} />
                </Wrapper>;
            }
        })
}
export default FormFocus;
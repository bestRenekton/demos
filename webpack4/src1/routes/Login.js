import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Login from '../components/Login';

function LoginRoute({ location, dispatch, login,history }) {
    const LoginProps = {
        onOk(data) {
            dispatch({
                type: 'login/LoginOn',
                payload: data,
                history:history
            })
            dispatch({
                type:"appMain/QueryMenu"
            });
        }
    }
    return (
        <Login {...LoginProps} />
    )
}
//监听属性，建立组件和数据的映射关系
function mapStateToProps({ login }) {
    return { login };
}
//关联model
export default connect(mapStateToProps)(LoginRoute);
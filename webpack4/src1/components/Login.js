import React, { PropTypes } from 'react'
import {
  Icon,
  message,
  Button,
  Row,
  Col,
  Form,
  Input,
  Select
} from 'antd'
import config from '../utils/config';
import styles from './Login.less'

const FormItem = Form.Item

function hasError(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.

    this.props.form.validateFields();
  }
  constructor(props) {

    super(props);
  }
  handleOk = () => {

    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      this.props.onOk(values)
    })
  }
  render() {
    const {
    getFieldDecorator,
      validateFieldsAndScroll,
      getFieldsError,
      isFieldTouched,
      getFieldError
  } = this.props.form;
    const userNameError = isFieldTouched('username') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <div className={styles.form}>
        <div className={styles.logo}>
          <img src={config.logoSrc} />
          <span>企业Sass</span>
        </div>
        <form>
          <FormItem validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''} hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请填写用户名'
                }
              ]
            })(<Input prefix={<Icon type="user"></Icon>} size="large" placeholder="用户名" />)}
          </FormItem>
          <FormItem validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''} hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请填写密码'
                }
              ]
            })(<Input size="large" prefix={<Icon type="lock" />} type="password" placeholder="密码" />)}
          </FormItem>
          <Row>
            <Button type="primary" size="large" disabled={hasError(getFieldsError())} onClick={this.handleOk} loading={this.props.loginButtonLoading}>
              登录
          </Button>
          </Row>
        </form>
      </div>
    )
  }
}
const Login1 = ({
  loginButtonLoading,
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsError
  }
}) => {

}

// Login.propTypes = {
//   form: PropTypes.object,
//   loginButtonLoading:PropTypes.bool,
//   onOk: PropTypes.func
// }

export default Form.create()(Login)

import React from 'react';
import { connect } from 'dva';
import styles from './Login.scss';



class Login extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('login-render',this.props)
    return (
      <div className={styles.flexContainer}>
        <p>Login</p>
      </div>
    )
  }
}

Login.propTypes = {
};

export default connect()(Login);

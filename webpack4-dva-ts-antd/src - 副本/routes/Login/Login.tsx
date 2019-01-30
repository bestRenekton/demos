import * as React from "react";
import { connect } from 'dva';
// import styles from './Login.scss';
import * as styles from './Login.scss';


interface IProps {
  props: any,
}

class Login extends React.Component<IProps, {}> {
  constructor(props: any) {
    super(props)
  }
  render() {
    console.log('login-render', this.props)
    return (
      <div className={styles.flexContainer}>
        <p>Login</p>
      </div>
    )
  }
}


export default connect()(Login);

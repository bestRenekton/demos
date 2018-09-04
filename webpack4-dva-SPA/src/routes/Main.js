import React from 'react';
import { connect } from 'dva';
import styles from './Main.scss';


class Main extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('main-render',this.props)
    return (
      <div className={styles.flexContainer}>
        <p>main</p>
      </div>
    )
  }
}

Main.propTypes = {
};

export default connect()(Main);

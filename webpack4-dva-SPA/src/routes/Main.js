import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import styles from './Main.scss';


class Main extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('main-render', this.props)
    return (
      <div className={styles.flexContainer}>
        <p>main</p>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    main: state.main
  }
}
Main.propTypes = {
  collapsed: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Main);

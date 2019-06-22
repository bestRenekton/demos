import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import styles from './Main.scss';

import HOCTest from '../components/HOC/HOCTest'
import UseEventListenerHook from '../components/Hooks/UseEventListenerHook'
import Hooks from '../components/Hooks/Hooks'
import UseReducer from '../components/Hooks/UseReducer'

@HOCTest
@connect((state, ownProps) => ({
  main: state.main
}))
class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      a: 'aaa'
    };
  }
  render() {
    console.log(this)
    return (
      <>
        <p onClick={() => { this.setState({ a: 'ccc' }) }}>改变父state</p>
        <Hooks a={this.state.a} />
        <UseReducer />
        {/* <UseEventListenerHook /> */}
      </>
    )
  }
}

Main.propTypes = {
  // collapsed: PropTypes.bool.isRequired
};

export default Main;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import styles from './Main.scss';

import HOCTest from '../components/HOC/HOCTest'
import UseEventListenerHook from '../components/Hooks/UseEventListenerHook'
import Hooks from '../components/Hooks/Hooks'
import UseReducerAsync from '../components/Hooks/UseReducerAsync'
import UseContet from '../components/Hooks/UseContext'
import UseReducer from '../components/Hooks/UseReducer'
import UseRefDemo from '../components/Hooks/UseRefDemo'

// @HOCTest
// @connect((state, ownProps) => ({
//   main: state.main
// }))
class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      a: 'aaa'
    };
  }
  componentDidMount() {
    debugger
    console.log('main-mount')
  }
  render() {
    console.log(this)
    return (
      <>
        <p onClick={() => { this.setState({ a: 'ccc' }) }}>改变父state</p>
        {/* <Hooks a={this.state.a} /> */}
        {/* <UseReducerAsync />
        <UseContet />
        <UseReducer /> */}
        {/* <UseEventListenerHook /> */}
        <UseRefDemo />
      </>
    )
  }
}

Main.propTypes = {
  // collapsed: PropTypes.bool.isRequired
};

export default HOCTest(Main);

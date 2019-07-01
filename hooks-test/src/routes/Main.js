import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import styles from './Main.scss';

import HOCTest from '../components/HOC/HOCTest'

//hooks
import Hooks from '../components/hooksDemos/Hooks'
import BasicHooks from '../components/hooksDemos/BasicHooks'
import UseEventListenerDemo from '../components/hooksDemos/UseEventListenerDemo'
import UseReducerAsyncDemo from '../components/hooksDemos/UseReducerAsyncDemo'
import UseContextDemo from '../components/hooksDemos/UseContextDemo'
import UseReducerDemo from '../components/hooksDemos/UseReducerDemo'
import UseRefDemo from '../components/hooksDemos/UseRefDemo'

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
  componentDidMount() {
    console.log('main-mount')
  }
  render() {
    console.log(this)
    return (
      <>
        {/* <p onClick={() => { this.setState({ a: 'ccc' }) }}>改变父state</p> */}
        <Hooks a={this.state.a} />
        {/* <BasicHooks /> */}
        {/* <UseContextDemo /> */}
        {/* <UseReducerDemo initialState={{count: 0}}/> */}
        {/* <UseReducerAsyncDemo /> */}
        {/* <UseEventListenerDemo /> */}
        {/* <UseRefDemo /> */}
      </>
    )
  }
}

Main.propTypes = {
  // collapsed: PropTypes.bool.isRequired
};

export default Main;

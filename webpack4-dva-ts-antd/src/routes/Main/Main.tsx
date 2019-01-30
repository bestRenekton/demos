// import React from 'react';
import * as React from "react";
import { connect } from 'dva';
// import styles from './Main.scss';
import * as styles from './Main.scss';
import * as immutable from 'immutable';


interface IBtnProps {
  name: string,
  add: () => void,
}
const Btn: React.SFC<IBtnProps> = (props) => {
  return (
    <div>
      <button className={styles.btn} onClick={props.add}>{props.name}</button>
      <p className={styles.p}>ddd</p>

    </div>
  )
}

interface IProps {
  main: any,
  size?: string,//非必填
  dispatch: any
}
interface IState {
  // count: number,
}
class Main extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      // count: 1,
    }
    this.add = this.add.bind(this);
  }
  componentDidMount() {
    // this.props.dispatch({
    //   type: 'main/fetchInit',
    //   payload: {
    //     a: 1
    //   }
    // })
  }
  // shouldComponentUpdate(nextProps: any, nextState: any) {
  //   return !(this.props === nextProps || immutable.is(this.props, nextProps)) ||
  //     !(this.state === nextState || immutable.is(this.state, nextState));
  // }
  add() {
    this.props.dispatch({
      type: 'main/add'
    })
  }
  public render() {
    console.log('main-render', this.props)
    let { main } = this.props;
    main = main.toJS();
    let { count } = main;
    return (
      <div>
        redux中的count:{count}
        <Btn name={"点我增加"} add={this.add} />
      </div>
    )
  }
}
function mapStateToProps(state: any, ownProps: any) {
  return {
    main: state.main
  }
}
export default connect(mapStateToProps)(Main);

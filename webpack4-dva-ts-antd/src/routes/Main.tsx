// import React from 'react';
import * as React from "react";
import { connect } from 'dva';
// import styles from './Main.scss';
import * as styles from './Main.scss';


interface IBtnProps {
  name: string,
  add: () => void,
}
const Btn: React.SFC<IBtnProps> = (props) => {
  return (
    <button className={styles.btn} onClick={props.add}>{props.name}</button>
  )
}

interface IProps {
  color: string,
  size?: string,//非必填
}
interface IState {
  count: number,
}
class Main extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      count: 1,
    }
    this.add = this.add.bind(this);
  }
  add() {
    this.setState({ count: this.state.count + 1 })
  }
  public render() {
    console.log('main-render', this.props)
    return (
      <div>
        Hello world,{this.state.count}
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

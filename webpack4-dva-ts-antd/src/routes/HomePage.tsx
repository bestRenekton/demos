import * as React from 'react';
import { connect } from 'dva';
import * as styles from './HomePage.scss';

// function HomePage(props) {
//   return (
//     <div className={styles.normal}>
//       <h1 className={styles.title}>Dva boilerplate with typescript</h1>
//       Count: {props.count}
//       <hr />
//       <button onClick={() => { props.dispatch({ type: 'count/add' }); }}>Add</button>
//       <button onClick={() => { props.dispatch({ type: 'count/addWithDelay' }); }}>Add With Delay</button>
//       <button onClick={() => { props.dispatch({ type: 'count/minus' }); }}>Minus</button>
//       <button onClick={() => { props.dispatch({ type: 'count/redirect' }); }}>redirect</button>
//     </div>
//   );
// }



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
    count: state.count
  }
}
// function mapStateToProps(state) {
//   return {
//     count: state.count,
//   };
// }

export default connect(mapStateToProps)(Main);

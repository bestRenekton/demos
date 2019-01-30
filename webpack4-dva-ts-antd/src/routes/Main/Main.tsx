import * as React from "react";
import { connect } from 'dva';
import * as styles from './Main.scss';
import * as immutable from 'immutable';
import { Tag, Table } from "antd"
import Example from '../../components/Example'


interface IProps {
  main: any,
  size?: string,//非必填
  dispatch: any
}
interface IState {
  // some: number,
}
class Main extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      // some: 1,
    }
    this.add = this.add.bind(this);
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'main/fetchInit',
      payload: {
        a: 1
      }
    })
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
    let { count, list, content } = main;
    const columns = [{
      title: '姓名',
      dataIndex: 'user_name',
      key: 'user_name',
    }, {
      title: '年龄',
      dataIndex: 'auth',
      key: 'auth',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '手机',
      dataIndex: 'mobile',
      key: 'mobile',
    }];

    return (
      <div className={styles.page}>
        <h1 className={styles.title}>ts-react-dva脚手架</h1>
        <div className={styles.tag}>
          <Tag color="volcano">ts3.2</Tag>
          <Tag color="magenta">react16.7全家桶</Tag>
          <Tag color="red">dva2.4</Tag>
          <Tag color="orange">webpack4</Tag>
          <Tag color="gold">antd3.13</Tag>
          <Tag color="lime">scss</Tag>
          <Tag color="green">fetch</Tag>
          <Tag color="cyan">immutable</Tag>
        </div>
        <Table title={() => '这是一个antd-table'} loading={list.length > 0 ? false : true} dataSource={list} columns={columns} />
        <Example content={content} name={'这是一个SFC组件'} count={count} add={this.add} />
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

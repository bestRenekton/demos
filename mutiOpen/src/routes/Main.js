import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import styles from './Main.scss';
import { Router, Route, Switch, Redirect } from 'dva/router';
import Header from '../components/Header'
import Footer from '../components/Footer'





@connect((state, ownProps) => ({ main: state.main }))

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  addRouter = (data) => {
    this.props.history.push({ pathname: data.url });
    this.props.dispatch({
      type: 'main/addRouter',
      payload: data
    })
  }
  switchRouter=(cur)=>{
    this.props.history.push({ pathname: this.props.main.routers[cur].url });
    this.props.dispatch({
      type: 'main/switchRouter',
      payload: cur
    })
  }
  render() {
    console.log('main-render', this.props)
    const { aside, DvaRouterList, routers, currentRouter } = this.props.main;
    const Curr = routers[currentRouter];
    const C = Curr ? Curr.Com : null;
    return (
      <div className={styles.flexContainer}>
        <Header />
        <div className={styles.content}>
          <aside className={styles.aside}>
            {
              aside.map((e, i) => {
                return (
                  <div key={i} onClick={() => { this.addRouter(e) }}>{e.name}</div>
                )
              })
            }
          </aside>
          <main className={styles.main}>
            <div className={styles.tabsHd}>
              {
                routers.map((e, i) => {
                  return (
                    <div 
                    onClick={()=>{this.switchRouter(i)}}
                    className={`${styles.hd} ${currentRouter===i?styles.active:''}`} key={i}>{e.title}</div>
                  )
                })
              }
            </div>
            <div className={styles.tabsBd}>
              {
                C ? C : null
              }
            </div>
            {/* <Switch>
              {DvaRouterList}
              <Redirect to="/404" />
            </Switch> */}
          </main>
        </div>
        <Footer />
      </div>
    )
  }
}

// function mapStateToProps(state, ownProps) {
//   return {
//     main: state.main
//   }
// }
// Main.propTypes = {
//   // collapsed: PropTypes.bool.isRequired
// };

// export default connect(mapStateToProps)(Main);
export default Main
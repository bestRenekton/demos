import React from 'react'
import { HashRouter , Route, Switch } from 'react-router-dom';


//同步加载
// import AppContainer from '../container/AppContainer/AppContainer'
// import NotFoundPage from '../container/NotFoundPage'
//异步加载
import Bundle from './bundle'
const AppContainer = (props) => (
  <Bundle load={() => import('../container/AppContainer/AppContainer')}>
    {(AppContainer) => <AppContainer {...props} />}
  </Bundle>
);

// const NotFoundPage = (props) => (
//   <Bundle load={() => import('../container/NotFoundPage')}>
//       {(NotFoundPage) => <NotFoundPage {...props}/>}
//   </Bundle>
// );

const RootRouter = () => (
  <HashRouter >
    <Switch>
      <Route exact path="/" component={AppContainer} />
      {/* <Route path="/call" component={AppContainer} /> */}
      <Route path="/talk" component={AppContainer} />
      <Route path="/desk" component={AppContainer} />
      <Route path="/phone" component={AppContainer} />
      <Route path="/map" component={AppContainer} />
      <Route path="/test" component={AppContainer} />

    </Switch>
  </HashRouter >
);
export default RootRouter;
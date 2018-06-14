import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';


//同步加载
import AppContainer from '../container/AppContainer/AppContainer'
// import NotFoundPage from '../container/NotFoundPage'


const RootRouter = () => (
  <HashRouter>
    <Switch>
      <Route path="/" component={AppContainer} />
      {/* <Route component={NotFoundPage}/> */}
    </Switch>
  </HashRouter>
);
export default RootRouter;
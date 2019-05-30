import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';


//同步加载
import App from './layout/App/App'
import Login from './login/login'
import NotFoundPage from './layout/NotFoundPage'


const RootRouter = () => (
  <HashRouter>
    <Switch>
      <Route path="/Login" component={Login} />
      <Route path="/" component={App} />
    </Switch>
  </HashRouter>
);
export default RootRouter;
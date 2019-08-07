import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';


//同步加载
import App from '@/routers/Layout/App/App'
import Login from '@/routers/Login/Login'



const RootRouter = () => (
  <HashRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={App} />
    </Switch>
  </HashRouter>
);
export default RootRouter;

module.exports =RootRouter
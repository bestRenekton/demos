import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';


//检测登录
const Validate = function (next) {
  // com.SetCookie('testCookie', new Date())
  // let token = com.GetCookie('token');
  // return !(token == "");
  return true
}



function RouterConfig({ history, app }) {
  const Login = dynamic({
    app,
    namespace: 'login',
    models: () => [import('./models/Login')],
    component: () => import('./routes/Login'),
  });
  const Main = dynamic({
    app,
    namespace: 'main',
    models: () => [import('./models/Main')],
    component: () => import('./routes/Main'),
  });


  let MainRoute = (props) => {
    return Validate() ?
      <Main {...props}>
      </Main> :
      <Redirect to="/login" />
  };
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={MainRoute} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

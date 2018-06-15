import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import Error from './components/Error/Error';
import com from './utils/com';

const Validate = function (next) {
  com.SetCookie('testCookie', new Date())
  let token = com.GetCookie('token');
  return !(token == "");
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
    models: () => [import('./models/Main/Main')],
    component: () => import('./routes/Main/Main'),
  });

  const User = dynamic({
    app,
    namespace: 'user',
    models: () => [import('./models/Users/User')],
    component: () => import('./routes/Users/Users'),
  });

  const Tea = dynamic({
    app,
    namespace: 'tea',
    models: () => [import('./models/FormTemplate/FormTemplate')],
    component: () => import('./routes/FormTemplate/FormTemplate'),
  });

  const Dic = dynamic({
    app,
    namespace: 'formBuilder',
    models: () => [import('./models/FormBuilder/FormBuilder')],
    component: () => import('./routes/FormBuilder/FormBuilder'),
  });
  const Func = dynamic({
    app,
    namespace: 'formViewer',
    models: () => [import('./models/FormViewer/FormViewer')],
    component: () => import('./routes/FormViewer/FormViewer'),
  });
  const Role = dynamic({
    app,
    namespace: 'role',
    models: () => [import('./models/Role/Role')],
    component: () => import('./routes/Role/Role'),
  });
  let list = [
    { key: 'func', component: <Route path='/main/func' component={Func} />, model: 'formBuilder' },
    { key: 'user', component: <Route path='/main/user' component={Role} />, model: 'role' },
    { key: 'dic', component: <Route path='/main/dic' component={Dic} />, model: 'func' }];
  let MainRoute = (props) => {
    return Validate() ?
      <Main {...props} tabItems={list}>
      </Main> :
      <Redirect to="/login" />
  };
  return <Router history={history} >
    <Switch>
      <Route path="/main" component={MainRoute} />
      <Route path="/login" component={Login} />
      <Redirect to="/login" />
    </Switch>
  </Router>
}

export default RouterConfig;

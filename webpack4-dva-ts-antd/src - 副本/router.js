import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';


function RouterConfig({ history, app }) {
  const Main = dynamic({
    app,
    namespace: 'main',
    models: () => [import('./models/Main.ts')],
    component: () => import('./routes/Main/Main.tsx'),
  });
  const Login = dynamic({
    app,
    namespace: 'login',
    models: () => [import('./models/Login')],
    component: () => import('./routes/Login/Login.tsx'),
  });


  return (
    <Router history={history}>
      <Switch>
        <Route path="/"  component={Main} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';


function RouterConfig({ history, app }) {
  const Main = dynamic({
    app,
    namespace: 'main',
    models: () => [import('./models/Main')],
    component: () => import('./routes/Main.tsx'),
  });



  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect,Switch } from 'react-router-dom';
import AppContainer from '../container/AppContainer/AppContainer'
import AdminContainer from '../container/AdminContainer/AdminContainer'
import About from '../container/About'
import NotFoundPage from '../container/NotFoundPage'


const RootRouter = () => (
  <Router>
    <Switch>
      <Route exact  path="/" component={AppContainer} />
      {/* <Route path="/About" component={About} /> */}
      <Route exact  path="/admin" component={AdminContainer} />
      {/* <Route component={NotFoundPage}/> */}
    </Switch>
  </Router>
  // <Router>
  //   <Route path="/" component={AppContainer}>
  //      <Route path="/about" component={AppContainer}></Route>

  //     {/* <Route path="about" component={AppContainer} />
  //     <Route path="inbox" component={AppContainer}>
  //       <Route path="messages/:id" component={AppContainer} />
  //     </Route> */}
  //   </Route>
  // </Router>
);
export default RootRouter;
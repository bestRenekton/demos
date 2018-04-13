import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect,Switch } from 'react-router-dom';
import AppContainer from '../container/AppContainer'
import NotFoundPage from '../container/NotFoundPage'


const RootRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={AppContainer} />
      <Route path="/admin" component={AppContainer} />
      <Route component={NotFoundPage}/>
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
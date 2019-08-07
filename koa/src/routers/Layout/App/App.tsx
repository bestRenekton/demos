import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom';

import { handleAdd, handleEdit } from '@/actions/index'

import AppHeader from '@/routers/Layout/Common/AppHeader/AppHeader'
import AppFooter from '@/routers/Layout/Common/AppFooter/AppFooter'
import NotFoundPage from '@/routers/Layout/Common/NotFoundPage/NotFoundPage'

import Home from '@/routers/Home/Home'

import './App.css';


const App: React.FC = (props) => {
  console.log(props)
  return (
    <div className="App">
      <AppHeader />
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/404' component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </main>
      <AppFooter />
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  app: state.app,
  list: state.todos.list,
})
const mapDispatchToProps = {
  handleAdd: handleAdd,
  handleEdit: handleEdit
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';



import styles from './App.scss'
import AppHeader from '../../../component/layout/AppHeader/AppHeader'
import AppFooter from '../../../component/layout/AppFooter/AppFooter'
import NotFoundPage from '../NotFoundPage'
import My from '../../my/my'
import { handleAdd, handleEdit } from '../../../actions/index'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        console.log(this)
        return (
            <div className={styles.body}>
                <AppHeader />
                <main className={styles.page}>
                    <Switch>
                        <Route exact path='/' component={My} />
                        <Route path='/my' component={My} />
                        <Route path='/404' component={NotFoundPage} />
                        <Redirect to="/404" component={NotFoundPage} />
                    </Switch>

                    {/* <Route exact path='/' component={HomeContainer} />
                    <Route path='/archives' component={ArchivesContainer} />
                    <Route path='/demo' component={DemoContainer} />
                    <Route path='/about' component={AboutContainer} />
                    <Route path="/detail/:id" component={DetailArticle} />
                    <Route path="/demoDetail/:id" component={DetailDemos} /> */}
                </main>
                <AppFooter />
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    list: state.todos.list,
})
const mapDispatchToProps = {
    handleAdd: handleAdd,
    handleEdit: handleEdit
}
export default App = connect(mapStateToProps, mapDispatchToProps)(App);




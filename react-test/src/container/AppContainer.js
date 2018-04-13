import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import About from '../container/About'

import Header from '../component/AppHeader/AppHeader'
import Footer from '../component/AppFooter'

export default class AppContainer extends Component{
    render(){
        return(
            <div>
                <Header />
                <Route path="/topics" component={AppContainer} />
                <Route path="/about" component={About} />
                <Footer />
            </div>
        )
    }
}




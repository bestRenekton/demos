import React, { Component } from 'react';


import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import AppHeader from '../../component/AppHeader/AppHeader'
import AppFooter from '../../component/AppFooter/AppFooter'
import SortTest from '../../component/SortTest/index'

@DragDropContext(HTML5Backend)
export default class AppContainer extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>垃圾桶</h1>
                    <AppHeader name="123" />
                    <AppFooter name="Paper" />
                </div>
                <SortTest />
            </div>
        )
    }
}




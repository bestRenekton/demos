import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import {Provider} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import './public/css/normalize.css'


import RootRouter from './router/index'
import reducers from './reducers/index'



const store = createStore(reducers,composeWithDevTools());
ReactDOM.render(
    <Provider store={store}>
        <RootRouter />
    </Provider>
    ,
    document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducers from '@/reducers/index'
import RootRouter from '@/routers/index'
import './index.css';


const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <RootRouter />
    </Provider>
    ,
    document.getElementById('root')
);

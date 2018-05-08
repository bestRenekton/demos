import React from 'react';
import ReactDOM from 'react-dom';
import RootRouter from './router/index'
import reducers from './reducers/reducers'
import { createStore } from 'redux'
import {Provider} from 'react-redux'



//public
import './public/css/public.css';
import './public/css/normalize.css';
import './public/css/font/iconfont.css'
import './public/js/animation.js'
import './public/js/tween.js'

const store = createStore(reducers);


// import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(
    <Provider store={store}>
        <RootRouter />
    </Provider>
    ,
    document.getElementById('root')
);




// registerServiceWorker();

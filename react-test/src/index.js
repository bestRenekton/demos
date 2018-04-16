import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
// import App1 from './App1';

import RootRouter from './router/index'
import './public/css/public.css';
import './public/css/normalize.css';
import './public/css/font/iconfont.css'
import './public/js/animation.js'
import './public/js/tween.js'

// import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(<RootRouter />, document.getElementById('root'));




// registerServiceWorker();

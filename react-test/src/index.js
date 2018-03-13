import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Test from './test';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App name='abcd'/>, document.getElementById('root'));
ReactDOM.render(<Test />, document.getElementById('root2'));
registerServiceWorker();

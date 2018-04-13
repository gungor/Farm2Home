import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

console.log('React.version')
console.log(React.version)


ReactDOM.render(

    <App />
, document.getElementById('root'));
registerServiceWorker();

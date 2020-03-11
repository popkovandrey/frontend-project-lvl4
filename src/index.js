/* eslint-disable */
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/applications.scss';
import gon from 'gon';

import renderApp from './index.jsx';

/* if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
} */

console.log('it wwwworks!');

console.log('gon', gon);

renderApp(gon);

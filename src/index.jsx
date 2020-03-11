import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

export default (data) => ReactDOM.render(
  <App data={data}/>,
  document.getElementById('chat'),
);

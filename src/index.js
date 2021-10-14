import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Foods from './components/Foods';

ReactDOM.render(
  <React.StrictMode>
    <Foods />
  </React.StrictMode>,
  document.getElementById('root')
);

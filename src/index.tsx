import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style.min.css';
import App from './App';
import 'moment/locale/fr';

ReactDOM.hydrate(
  <App />,
  document.getElementById('root') as HTMLElement
);

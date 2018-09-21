import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import C1 from './c1';

ReactDOM.hydrate(
    <C1 />,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();

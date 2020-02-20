import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

/* Import components */
import App from './containers/App';

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);

serviceWorker.unregister();

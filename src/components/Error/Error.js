import React from 'react';

/* Importar CSS */
import './Error.css';

const NotFound = ({ error }) => {
    return (
        <div className="not-found">
            <i className="material-icons icon-gif">sentiment_very_dissatisfied</i>
            <h5>{error}, try to reload the page.</h5>
        </div>
    );
}

export default NotFound;
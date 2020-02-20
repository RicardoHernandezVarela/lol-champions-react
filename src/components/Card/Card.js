import React from 'react';

/* Import CSS */
import './Card.css';

const Card = ({ title, img, info}) => {
    return (
        <div className="champion-info">
            <span>{title}</span>
            <img src={img} alt="champion"/>
            <p>{info}</p>
        </div>
    )
}

export default Card;
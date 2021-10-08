import './MoreCards.css';
import React from 'react';

function MoreCards({handleMore}) {
    return (
        <div className="more-cards">
            <button className="button more-cards__button" onClick={handleMore}>Ещё</button>
        </div>
    );
}

export default MoreCards;
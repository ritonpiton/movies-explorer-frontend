import './Portfolio.css';
import React from 'react';

function Portfolio() {
    return (
        <div className="portfolio">
            <h4 className="portfolio__title">Портфолио</h4>
            <ul className="portfolio__links">
                <li className="portfolio__link-container"><a className="link portfolio__link" href="https://github.com/ritonpiton/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт</a></li>
                <li className="portfolio__link-container"><a className="link portfolio__link" href="https://ritonpiton.github.io/russian-travel/" target="_blank" rel="noreferrer">Адаптивный сайт</a></li>
                <li className="portfolio__link-container"><a className="link portfolio__link" href="https://mesto.frontend.domain.nomoredomains.rocks/" target="_blank" rel="noreferrer">Одностраничное приложение</a></li>
            </ul>
        </div>
    );
}

export default Portfolio;
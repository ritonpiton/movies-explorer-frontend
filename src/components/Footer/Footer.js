import './Footer.css';
import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
                <ul className="footer__links">
                    <li className="footer__link-container">
                        <a className="link footer__link" href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__link-container">
                        <a className="link footer__link" href="https://github.com/ritonpiton" target="_blank" rel="noreferrer">Github</a>
                    </li>
                    <li  className="footer__link-container">
                        <a className="link footer__link" href="https://t.me/piton_piton" target="_blank" rel="noreferrer">Telegram</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
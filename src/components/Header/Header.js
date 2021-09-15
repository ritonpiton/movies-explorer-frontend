import './Header.css';
import React from 'react';
import headerLogo from '../../images/logo.svg';
import {Link} from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {

    const isLoggedIn = (`${loggedIn ? "loggedIn" : ""}`);

    return (
        <header className={`header header__${isLoggedIn}`}>
            <Link to="/">
                <img className="logo" src={headerLogo} alt="Логотип" />
            </Link>
            <div className="header__profile-links-container">
            {
                loggedIn
                    ? (
                        <Navigation/>
                    )
                    : (
                        <>
                            <Link className="link header__link header__link_type_signup" to="/signup">Регистрация</Link>
                            <Link className="" to="/signin">
                                <button className="button header__link header__link_type_signin">Войти</button>
                            </Link>
                        </>
                    )
            }
            </div>
        </header>
    );
}

export default Header;
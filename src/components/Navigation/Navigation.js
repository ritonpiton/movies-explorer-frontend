import './Navigation.css';
import React from 'react';
import {NavLink} from "react-router-dom";
import AccountButton from "../AccountButton/AccountButton";

function Navigation() {
    return (
        <nav className="navigation">
            <div className="hamburger-menu">
                <input id="checkbox" type="checkbox"/>
                <label className="navigation__burger-btn" htmlFor="checkbox">
                    <span></span>
                </label>

                <div className="navigation__links-container">
                    <ul className="navigation__links">
                        <ul className="navigation__link-container">
                            <li className="navigation__link-item"><NavLink className={`link navigation__link navigation__link_type_main`} exact to="/" activeClassName="navigation__link_type_active">Главная</NavLink></li>
                            <li className="navigation__link-item"><NavLink className={`link navigation__link navigation__link_type_movies`} to="/movies" activeClassName="navigation__link_type_active">Фильмы</NavLink></li>
                            <li className="navigation__link-item"><NavLink className={`link navigation__link navigation__link_type_saved-movies`} to="/saved-movies" activeClassName="navigation__link_type_active">Сохранённые фильмы</NavLink></li>
                        </ul>
                        <ul className="navigation__link-container">
                            <AccountButton/>
                        </ul>

                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navigation;
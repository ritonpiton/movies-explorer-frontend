import './AccountButton.css';
import React from 'react';
import {Link} from "react-router-dom";
import profileIcon from "../../images/profile-icon.svg";

function AccountButton({ content }) {
    return (
        <div className={`account account__content_type_${content}`}>
            <Link className="button account__link" to="profile">Аккаунт
                <button className="account__button"><img className="account__image" src={profileIcon} alt="Иконка профиля" /></button>
            </Link>
        </div>
    );
}

export default AccountButton;
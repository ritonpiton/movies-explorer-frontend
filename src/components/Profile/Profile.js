import './Profile.css';
import React from 'react';

function Profile({ userName, userEmail, handleProfile }) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'name') setName(value);
        if (name === 'email') setEmail(value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !name) {
            return;
        }
        handleProfile(name, email)
    }
    return (
        <div className="profile">
            <h2 className="profile__title">Привет, {userName}!</h2>
            <form className="profile__form">
                <fieldset className="profile__fieldset">
                    <label className="profile__label">Имя</label>
                    <input name="name" id="name-input" type="name" value={name} onChange={handleChange} placeholder={userName}
                           className="profile__input" />
                    <span className="form__input-error name-input-error"></span>
                </fieldset>
                <fieldset className="profile__fieldset">
                    <label className="profile__label">Email</label>
                    <input name="email" id="email-input" type="email" value={email} onChange={handleChange} placeholder={userEmail}
                           className="profile__input" />
                    <span className="form__input-error email-input-error"></span>
                </fieldset>

                <button className="button profile__button profile__button_type_submit" onSubmit={handleSubmit}>Редактировать</button>
                <button className="button profile__button profile__button_type_quit">Выйти из аккаунта</button>
            </form>

        </div>

    );
}

export default Profile;
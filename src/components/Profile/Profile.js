import './Profile.css';
import React from 'react';
import {useFormWithValidation} from "../../utils/useFormWithValidation";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Profile({ onEditProfile, signOut, errorText }) {
    const { values, errors, isValid, handleChange, setValues } = useFormWithValidation({});
    const [isEditActive, setEditActive] = React.useState(false);

    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(() => {
        setValues({
            ...values,
            name: currentUser.name,
            email: currentUser.email,
        })
    }, [currentUser, setValues, errorText]);

    function handleSubmit(e) {
        e.preventDefault();
        onEditProfile(values);
        setEditActive(false);
    }
    function handleEditActive(){
        setEditActive(true);
    }
    return (
        <div className="profile">
            <h2 className="profile__title">Привет, {currentUser.name}!</h2>
            <form className="profile__form" onSubmit={handleSubmit}>
                <fieldset className="profile__fieldset">
                    <label className="profile__label">Имя</label>
                    <input name="name" id="name-input" type="text" value={values.name} onChange={handleChange} placeholder="Имя"
                           className={`profile__input ${isEditActive ? '' : 'profile__input_disabled'}`} pattern={"[A-Za-zА-Яа-яЁё\\s\\-]{1,200}"}/>
                    <span className="profile__input-error name-input-error">{errors.name}</span>
                </fieldset>
                <fieldset className="profile__fieldset">
                    <label className="profile__label">Email</label>
                    <input name="email" id="email-input" type="text" value={values.email} onChange={handleChange} placeholder="Email"
                           className={`profile__input ${isEditActive ? '' : 'profile__input_disabled'}`} />
                    <span className="profile__input-error email-input-error">{errors.email}</span>
                </fieldset>

                <div className="profile__buttons-container">
                    <span className="profile__api-error">{errorText}</span>
                    <button type="submit" className={`button profile__button profile__button_type_submit ${isEditActive ? 'profile__button_shown' : 'profile__button_not-shown'} ${isValid && (currentUser.name !== values.name || currentUser.email !== values.email) ? '' : 'profile__button_type_submit_disabled'}`}>Сохранить</button>
                    <button type="button" className={`button profile__button profile__button_type_edit ${isEditActive ? 'profile__button_not-shown' : 'profile__button_shown'}`} onClick={handleEditActive}>Редактировать</button>
                    <button type="button" className={`button profile__button profile__button_type_quit ${isEditActive ? 'profile__button_not-shown' : 'profile__button_shown'}`} onClick={signOut}>Выйти из аккаунта</button>
                </div>
            </form>

        </div>

    );
}

export default Profile;
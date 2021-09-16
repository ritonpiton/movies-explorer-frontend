import './Form.css'
import {Link} from "react-router-dom";
import React from "react";
import logo from "../../images/logo.svg";

function Form({ register, title, buttonText, linkText, handleForm }) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'name') setName(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        handleForm(password, email)
    }
     return (
        <div className="form">
            <Link className="form__logo-container" to="/">
                <img className="logo form__logo" src={logo} alt="Логотип" />
            </Link>
            <h1 className="form__title">{title}</h1>
            <form className="form__container" onSubmit={handleSubmit}>
                {
                    register ? (
                        <>
                            <label className="form__label">Имя</label>
                            <input name="name" id="name-input" type="name" value={name} onChange={handleChange} placeholder="Введите имя..."
                                   className="form__input form__input_type_email" minLength="1" maxLength="200" required />
                            <span className="form__input-error email-input-error"></span>
                        </>
                    ) : (
                        ""
                    )}
                <label className="form__label">Email</label>
                <input name="email" id="email-input" type="email" value={email} onChange={handleChange} placeholder="ВВедите email..."
                       className="form__input form__input_type_email" minLength="5" maxLength="200" required />
                <span className="form__input-error email-input-error"></span>

                <label className="form__label">Пароль</label>
                <input name="password" id="password-input" type="password" value={password} onChange={handleChange} placeholder="Введите пароль..."
                       className="form__input form__input_type_job" minLength="2" maxLength="200" required />
                 <span className="form__input-error job-input-error"></span>

                <button type="submit" className="button form__submit-btn">{buttonText}</button>
            </form>
            <div className="form__not-sign">
                <p className="form__not-sign-text">{register ? 'Уже' : 'Еще не' } зарегестрированы? <Link to={register ? "/signin" : "/signup"} className="form__not-sign-link">{linkText}</Link></p>
            </div>
        </div>
     );
}

export default Form;
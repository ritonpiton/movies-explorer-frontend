import './Form.css'
import { Link, withRouter } from "react-router-dom";
import React from "react";
import logo from "../../images/logo.svg";
import {useFormWithValidation} from "../../utils/useFormWithValidation";

function Form({ register, title, buttonText, linkText, handleForm }) {
    const { values, errors, isValid, handleChange } = useFormWithValidation({});

    function handleSubmit(e) {
        e.preventDefault();
        register ? handleForm(values.name, values.email, values.password) : handleForm(values.email, values.password);
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
                            <input name="name" id="name-input" type="name" value={values.name} onChange={handleChange} placeholder="Введите имя..."
                                   className="form__input form__input_type_name" minLength="1" maxLength="200" pattern={"[A-Za-zА-Яа-яЁё\\s\\-]{1,200}"} required />
                            <span className="form__input-error name-input-error">{errors.name}</span>
                        </>
                    ) : (
                        ""
                    )}
                <label className="form__label">Email</label>
                <input name="email" id="email-input" type="email" value={values.email} onChange={handleChange} placeholder="Введите email..."
                       className="form__input form__input_type_email" minLength="5" maxLength="200" required />
                <span className="form__input-error email-input-error">{errors.email}</span>

                <label className="form__label">Пароль</label>
                <input name="password" id="password-input" type="password" value={values.password} onChange={handleChange} placeholder="Введите пароль..."
                       className="form__input form__input_type_job" minLength="2" maxLength="200" required />
                 <span className="form__input-error job-input-error">{errors.password}</span>

                <button type="submit" className={`button form__submit-btn ${isValid ? '' : 'form__submit-btn_type_disabled'}`}>{buttonText}</button>
            </form>
            <div className="form__not-sign">
                <p className="form__not-sign-text">{register ? 'Уже' : 'Еще не' } зарегестрированы? <Link to={register ? "/signin" : "/signup"} className="form__not-sign-link">{linkText}</Link></p>
            </div>
        </div>
     );
}

export default withRouter(Form);
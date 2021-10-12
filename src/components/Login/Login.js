import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from "../Form/Form";

function Login({ handleLogin, errorText }) {
    return (
        <Form register={false} title="Рады видеть!" buttonText="Войти" linkText="Регистрация" handleForm={handleLogin} errorText={errorText}/>
    )
}

export default withRouter(Login);

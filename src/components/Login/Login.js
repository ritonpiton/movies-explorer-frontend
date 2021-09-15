import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from "../Form/Form";

function Login({ handleLogin }) {
    return (
        <Form title="Рады видеть!" buttonText="Войти" linkText="Регистрация" handleForm={handleLogin}/>
    )
}

export default withRouter(Login);

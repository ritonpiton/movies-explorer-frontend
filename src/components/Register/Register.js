import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from "../Form/Form";

function Register({ handleRegister, errorText }) {
    return (
        <Form register={true} title="Добро пожаловать!" buttonText="Зарегестрироваться" linkText="Войти" handleForm={handleRegister} errorText={errorText}/>
    )
}

export default withRouter(Register);
import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from "../Form/Form";

function Register({ handleRegister }) {
    return (
        <Form register={true} title="Добро пожаловать!" buttonText="Зарегестрироваться" linkText="Войти" handleForm={handleRegister}>
        </Form>
    )
}

export default withRouter(Register);
import './NotFoundError.css';
import React from 'react';
import { Link,useHistory } from "react-router-dom";

function NotFoundError() {
    const history = useHistory();
    return(
        <div className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__text">Страница не найдена</p>
            <Link className="link not-found__link" onClick={() => history.goBack()}>Назад</Link>
        </div>
    )
}

export default NotFoundError;
import './App.css';
import React from 'react';
import { Route, Switch, withRouter, useRouteMatch, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFoundError from "../NotFoundError/NotFoundError";


function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);

    React.useEffect(() => {
    }, [])

    function handleLogin(email, password) {
    }
    function handleRegister(name, email, password) {
    }

    return (
        <div className="app">
            {
                useRouteMatch(['/signin', '/signup', '/not-found']) ? '' : ( <Header loggedIn={loggedIn}/> )
            }
            <Switch>
                <Route exact path='/'>
                    <Main loggedIn={loggedIn} />
                </Route>
                <Route path='/signup'>
                    <Register handleRegister={handleRegister} />
                </Route>
                <Route path='/signin'>
                    <Login handleLogin={handleLogin}/>
                </Route>
                <Route path='/profile'>
                    <Profile userName="Имя" userEmail="Email"/>
                </Route>
                <Route path='/movies'>
                    <Movies />
                </Route>
                <Route path='/saved-movies'>
                    <SavedMovies />
                </Route>
                <Route path='/*'>
                    <Redirect to='/not-found'></Redirect>
                    <NotFoundError />
                </Route>
            </Switch>
            {
                useRouteMatch(['/signin', '/signup', '/profile', '/not-found']) ? '' : ( <Footer/> )
            }
        </div>
    );
}

export default withRouter(App);
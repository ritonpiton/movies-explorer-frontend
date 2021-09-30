import './App.css';
import React from 'react';
import { Route, Switch, withRouter, useRouteMatch, Redirect, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFoundError from "../NotFoundError/NotFoundError";
import * as mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";


function App() {
    const history = useHistory();
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isRegistered, setIsRegistered] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});


    // получем данные текущего пользователя и карточки из стороннего API
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if(loggedIn) {
            Promise.all([mainApi.getUserInfo(token) ])
                .then(([ userData ]) => {
                    setCurrentUser(userData.data);
                })
                .catch((err) => console.log(`Ошибка инициализации исходных данных \n${err}`));
        }
    },[loggedIn])
    React.useEffect(() => {
        tokenCheck();
    }, [])

    function handleRegister(name, email, password) {
        mainApi.register(name, email, password)
            .then((res) => {
                if (res) {
                    setIsRegistered(true);
                    handleLogin(email,password);
                }
                else setIsRegistered(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    function handleLogin(email, password) {
        mainApi.authorize(email, password)
            .then((res) => {
                if (res) {
                    localStorage.setItem('token', res.token);
                    setLoggedIn(true);
                    history.push('/');
                }
            })
            .catch(err => console.log(err))
    }
    function tokenCheck() {
        const token = localStorage.getItem('token');
        if (token){
            mainApi.getContent(token)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                    }
                })
                .catch(err => console.log(err))
        }
    }
    function signOut() {
        localStorage.removeItem('token');
        setLoggedIn(false);
        history.push('/')
    }
    function handleEditProfile({name, email}) {
        const token = localStorage.getItem('token');
        mainApi.setUserInfo({name, email}, token)
            .then((newUserData) => {
                setCurrentUser(newUserData.data);
            })
            .catch((err) => console.log(`Ошибка изменения данных профиля \n${err}`))
    }
    /*function handleSearchMovie(request) {
        const str = request.toLowerCase();
        initialCards.map(item => {
            console.log(item);
            /!*if (request && item.nameRu.toLowerCase().includes(str)) {
                return (
                    <Card key={item._id} card={item}/>
                )
            } else {
                return;
            }*!/
        })
    }*/

    return (
        <CurrentUserContext.Provider value={currentUser}>
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
                        <Profile onEditProfile={handleEditProfile} signOut={signOut}/>
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
        </CurrentUserContext.Provider>
    );
}

export default withRouter(App);
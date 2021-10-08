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

  // РАБОТА С КАРТОЧКАМИ
  const [initialCards, setInitialCards] = React.useState([]); // тут хранятся все карточки из стороннего API
  const [uniqueRequestedCards, setUniqueRequestedCards] = React.useState([]); // а тут - карточки, запрошенные пользователем
  const [savedMovies, setSavedMovies] = React.useState([]); // сохраненные карточки пользователя

  const [isCheckboxDisabled, setIsCheckboxDisabled] = React.useState(true);

  function isShortMovieChecked(status) {
    setIsCheckboxDisabled(status)
  }

  // получем данные текущего пользователя, карточки из стороннего API и сохранённые фильмы
  React.useEffect(() => {
      const token = localStorage.getItem('token');
      if(loggedIn) {
        mainApi.getUserInfo(token)
          .then(userData => {
            setCurrentUser(userData.data);
          })
          .catch((err) => console.log(`Ошибка получения данных профиля \n${err}`))

        moviesApi.getInitialCards()
          .then(allMoviesArray => {
            setInitialCards(allMoviesArray);
            localStorage.setItem("allMovies", JSON.stringify(allMoviesArray));
          })
          .catch((err) => {
            console.log(`Ошибка получения фильмов из базы \n${err}`);
            localStorage.removeItem("allMovies");
          })

        mainApi.getSavedMovies(token)
          .then (savedMoviesArray => {
            setSavedMovies(Array.from(savedMoviesArray.data));
            localStorage.setItem("savedMovies", JSON.stringify(savedMoviesArray));
          })
          .catch((err) => {
            console.log(`Ошибка получения сохранённых фильмов \n${err}`);
            localStorage.removeItem("savedMovies");
          })
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
    const allMovies = localStorage.getItem('allMovies');
    const savedMovies = localStorage.getItem('savedMovies');
    if (token){
      if(allMovies) {
        setInitialCards(JSON.parse(allMovies));
      }
      if(savedMovies) {
        setSavedMovies(JSON.parse(savedMovies));
      }
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
    localStorage.removeItem('allMovies');
    localStorage.removeItem('savedMovies');
    setLoggedIn(false);
    setInitialCards([]);
    setSavedMovies([]);
    setUniqueRequestedCards([]);
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


  const handleSearchMovie = React.useCallback((request, whereToFind) => {
      const str = request.toLowerCase();
      const set = new Set(uniqueRequestedCards);

      whereToFind.map(item => {
        if (request && !isCheckboxDisabled && item.duration < 40 && item.nameRU.toLowerCase().includes(str)) {
          set.add(item);
        } else if (request && isCheckboxDisabled && item.nameRU.toLowerCase().includes(str)) {
          set.add(item);
        }
          else {
          return;
        }
      })
      setUniqueRequestedCards(Array.from(set));
    }, [initialCards, isCheckboxDisabled])

  function handleAddMovie(movie) {
    const token = localStorage.getItem('token');
    mainApi.addMovie(movie, token)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie]);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch((err) => console.log(`Ошибка добавления карточки \n${err}`))
  }

  function handleDeleteMovie(movie) {
    const token = localStorage.getItem('token');
    console.log(token)
    mainApi.deleteMovie(movie._id, token)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => !(item._id === movie._id) && item))
      })
      .catch((err) => console.log(`Ошибка удаления карточки \n${err}`))
  }

  function handleIsSaved(movie) {
    if (!savedMovies && movie) {
      return savedMovies.some((item) => {
        return item.movieId === movie.id;
      });
    }
  }

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
                  <ProtectedRoute path='/profile'
                                  loggedIn={loggedIn}
                                  component={Profile}
                                  onEditProfile={handleEditProfile}
                                  signOut={signOut}/>

                  <ProtectedRoute path='/movies'
                                  loggedIn={loggedIn}
                                  component={Movies}

                                  onCardAdd={handleAddMovie}
                                  onCardDelete={handleDeleteMovie}

                                  whereToFind={initialCards}
                                  requestedMovies={uniqueRequestedCards}
                                  savedMovies={savedMovies}
                                  handleSearchMovie={handleSearchMovie}

                                  isSaved={handleIsSaved}
                                  isShortMovieChecked={isShortMovieChecked}/>

                  <ProtectedRoute path='/saved-movies'
                                  loggedIn={loggedIn}
                                  component={SavedMovies}
                                  whereToFind={savedMovies}
                                  requestedMovies={uniqueRequestedCards}
                                  savedMovies={savedMovies}
                                  handleSearchMovie={handleSearchMovie}
                                  onCardDelete={handleDeleteMovie}
                                  isSaved={handleIsSaved}
                                  isShortMovieChecked={isShortMovieChecked}/>

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
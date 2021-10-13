import './App.css';
import React from 'react';
import { Route, Switch, withRouter, useRouteMatch, Redirect, useHistory, useLocation } from 'react-router-dom';
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
  const path = useLocation();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isCheckingToken, setIsCheckingToken] = React.useState(true) // (1)
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  // РАБОТА С КАРТОЧКАМИ
  const [initialMovies, setInitialMovies] = React.useState([]); // карточки из стороннего API
  const [requestedMoviesCards, setRequestedMoviesCards] = React.useState([]); // карточки по запросу на Movies
  const [shortMoviesCards, setShortMoviesCards] = React.useState([]); // короткометражки по запросу на Movies

  const [savedMovies, setSavedMovies] = React.useState([]); // сохраненные карточки пользователя
  const [requestedSavedMoviesCards, setRequestedSavedMoviesCards] = React.useState([]);// карточки по запросу на SavedMovies
  const [shortSavedMoviesCards, setShortSavedMoviesCards] = React.useState([]); // короткометражки по запросу на SavedMovies

  const [isCheckboxDisabled, setIsCheckboxDisabled] = React.useState(true); // чекбокс короткометражек

  // ОШИБКИ
  const [serverError, setServerError] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

  function isShortMovieChecked(status) {
    setIsCheckboxDisabled(status);
  }

  // получем данные текущего пользователя, карточки из стороннего API и сохранённые фильмы
  React.useEffect(() => {
      const token = localStorage.getItem('token');
      if(loggedIn) {
        mainApi.getUserInfo(token)
          .then(userData => {
            setCurrentUser(userData.data);
            setIsCheckingToken(false);
          })
          .catch((err) => console.log(`Ошибка получения данных профиля \n${err}`))

        moviesApi.getInitialCards()
          .then(allMoviesArray => {
            setInitialMovies(allMoviesArray);
            localStorage.setItem("allMovies", JSON.stringify(allMoviesArray));
          })
          .catch((err) => {
            console.log(`Ошибка получения фильмов из базы \n${err}`);
            localStorage.removeItem("allMovies");
            setServerError(true);
          })

        mainApi.getSavedMovies(token)
          .then (savedMoviesArray => {
            setSavedMovies(Array.from(savedMoviesArray.data));
            localStorage.setItem("savedMovies", JSON.stringify(savedMoviesArray));
          })
          .catch((err) => {
            console.log(`Ошибка получения сохранённых фильмов \n${err}`);
            localStorage.removeItem("savedMovies");
            setServerError(true);
          })
      }
  },[loggedIn, path.pathname])


  React.useEffect(() => {
      tokenCheck();
  }, [])

  // сбрасвыем текст ошибок, блок поиска и чекбокс короткометражек, при кажой смене страницы
  React.useEffect(() => {
    setErrorText('');
    setRequestedMoviesCards([]);
    setRequestedSavedMoviesCards([]);
    setIsCheckboxDisabled(true);
  }, [path.pathname])

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
        if (err.status === 400) setErrorText('Неверно заполнено одно из полей.')
        else if (err.status === 409) setErrorText('Пользователь с таким email уже существует.')
        else setErrorText('При регистрации пользователя произошла ошибка.')
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
      .catch((err) => {
        if (err.status === 400) setErrorText('Пропущено одно из полей.')
        else if (err.status === 401) setErrorText('Вы ввели неправильный логин или пароль.')
      })
  }
  function handleEditProfile({name, email}) {
    const token = localStorage.getItem('token');
    setErrorText('')
    mainApi.setUserInfo({name, email}, token)
      .then((newUserData) => {
          setCurrentUser(newUserData.data);
          setLoggedIn(true);
      })
      .catch((err) => {
        if (err.status === 400) setErrorText('Неверно заполнено одно из полей.')
        else if (err.status === 409) setErrorText('Пользователь с таким email уже существует.')
        else setErrorText('При регистрации пользователя произошла ошибка.')
      })
  }
  function tokenCheck() {
    const token = localStorage.getItem('token');
    const allMovies = localStorage.getItem('allMovies');
    const savedMovies = localStorage.getItem('savedMovies');
    if (token){
      if(allMovies) {
        setInitialMovies(JSON.parse(allMovies));
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
    setTimeout(() => {
      setIsCheckingToken(false);
    }, 50);
  }
  function signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('savedMovies');
    setLoggedIn(false);
    setInitialMovies([]);
    setSavedMovies([]);
    setRequestedMoviesCards([]);
    setRequestedSavedMoviesCards([]);
    setShortMoviesCards([]);
    setShortSavedMoviesCards([]);
    history.push('/')
  }

  // поиск по тексту
  function searchByText(request, whereToFind) {
    const str = request.toLowerCase();
    const set = new Set();
    whereToFind.map(item => {
      if (request && item.nameRU.toLowerCase().includes(str)) {
        set.add(item);
      }
      else {
        return;
      }
    })
    return Array.from(set);
  }
  // поиск по длительности
  function searchShortMovies(whereToFind) {
    const set = new Set();
    whereToFind.map(item => {
      if (item.duration <= 40) {
        set.add(item);
      }
      else {
        return;
      }
    })
    return Array.from(set);
  }
  function searchOnMoviesPage(request) {
    setRequestedMoviesCards(searchByText(request, initialMovies));
  }
  function searchOnSavedMoviesPage(request) {
    setRequestedSavedMoviesCards(searchByText(request, savedMovies));
  }

  React.useEffect(() => {

     if (path.pathname === '/movies') {
       setShortMoviesCards(searchShortMovies(requestedMoviesCards));
     } else if (path.pathname === '/saved-movies') {
       setShortSavedMoviesCards(searchShortMovies(requestedSavedMoviesCards.length > 0 ? requestedSavedMoviesCards : savedMovies));
     }

  }, [isCheckboxDisabled])

  function handleAddMovie(movie) {
    const token = localStorage.getItem('token');
    mainApi.addMovie(movie, token)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie]);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch((err) => {
        console.log(`Ошибка добавления карточки \n${err}`);
        setServerError(true);
      })
  }
  function handleDeleteMovie(movie) {
    const token = localStorage.getItem('token');

    let movieId;
    if (path.pathname === '/movies') {
      movieId = savedMovies.filter((item) => { return (item.movieId === movie.id) })[0]._id;
    }
    else if (path.pathname === '/saved-movies'){
      movieId = movie._id
    }

    mainApi.deleteMovie(movieId, token)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => !(item._id === movie._id) && item))
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки \n${err}`);
        setServerError(true);
      })
  }
  function handleIsSaved(movie) {
    if (savedMovies && movie) {
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
                      <Register handleRegister={handleRegister}
                                errorText={errorText}/>
                  </Route>
                  <Route path='/signin'>
                      <Login handleLogin={handleLogin}
                             errorText={errorText}/>
                  </Route>
                  <ProtectedRoute path='/profile'
                                  loggedIn={loggedIn}
                                  isCheckingToken={isCheckingToken}
                                  component={Profile}
                                  onEditProfile={handleEditProfile}
                                  signOut={signOut}
                                  errorText={errorText}/>

                  <ProtectedRoute path='/movies'
                                  loggedIn={loggedIn}
                                  isCheckingToken={isCheckingToken}
                                  component={Movies}
                                  movies={isCheckboxDisabled ? requestedMoviesCards : shortMoviesCards}
                                  whereToFind={initialMovies}
                                  handleSearch={searchOnMoviesPage}
                                  isShortMovieChecked={isShortMovieChecked}
                                  isMovieSaved={handleIsSaved}
                                  onAddMovie={handleAddMovie}
                                  onDeleteMovie={handleDeleteMovie}
                                  serverError={serverError}
                                  />

                  <ProtectedRoute path='/saved-movies'
                                  loggedIn={loggedIn}
                                  isCheckingToken={isCheckingToken}
                                  component={SavedMovies}
                                  movies={isCheckboxDisabled ? requestedSavedMoviesCards : shortSavedMoviesCards}
                                  savedMovies={savedMovies}
                                  whereToFind={savedMovies}
                                  handleSearch={searchOnSavedMoviesPage}
                                  isShortMovieChecked={isShortMovieChecked}
                                  isMovieSaved={handleIsSaved}
                                  onDeleteMovie={handleDeleteMovie}
                                  />

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
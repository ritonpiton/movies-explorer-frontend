import './MoviesCardList.css';
import {SHORT_MOVIE_DURATION, MORE_BUTTON_SETTINGS} from '../../utils/constants';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from "../Preloader/Preloader";
import MoreCards from '../MoreCards/MoreCards';

function MoviesCardList({ movies, isOnSavedPage, isMovieSaved, onAddMovie, onDeleteMovie, serverError }) {

    const [isLoading, setIsLoading] = React.useState(true);
    const [index, setIndex] = React.useState(0); // сколько раз была нажата кнопка "Ещё"
    const [windowSize, setWindowSize] = React.useState(window.innerWidth);
    const [count, setCount] = React.useState(0);

    // прелоадер
    React.useEffect(() => {
        const loadingTimeout = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(loadingTimeout);
    }, []);

    // изменения количества отображаемых карточек, в зависимости от страницы
    React.useEffect(() => {
        isOnSavedPage ? setCount(movies.length) : setCount(sizeOfPreloadedArray() + index * sizeOfAddedLine());
    }, [index])

    // отслеживаем изменение размера экрана
    React.useEffect(() => {
        const setWindowWidth = () => {
            const newWidth = window.innerWidth;
            setWindowSize(newWidth);
        }
        window.addEventListener("resize", setWindowWidth);
        return () => window.removeEventListener("resize", setWindowWidth);
    }, [])

    function handleMore() {
        setIndex(index+1);
    }

    // сколько карточек загрузить при первой загрузке
    const sizeOfPreloadedArray = () => {
        if (windowSize >= 1280) {
            return MORE_BUTTON_SETTINGS.desktop.preload;
        } else if (windowSize < 768) {
            return MORE_BUTTON_SETTINGS.mobile.preload;
        } else return MORE_BUTTON_SETTINGS.tablet.preload;
    }

    // по сколько карточек добавлять при нажатии кнопки "Ещё"
    const sizeOfAddedLine = () => {
        if (windowSize >= 1280) {
            return MORE_BUTTON_SETTINGS.desktop.add;
        } else return MORE_BUTTON_SETTINGS.tablet.add;
    }

    return(
        <>
            {
                isLoading ? <Preloader/>
                    : (
                        <div className="cards">
                            {
                                movies && movies.length > 0
                                    ? (
                                        movies.slice(0, count).map((movie) => {
                                            return (
                                                <MoviesCard key={isOnSavedPage? movie._id : movie.id}
                                                            card={movie}
                                                            isOnSavedPage={isOnSavedPage}
                                                            isMovieSaved={isMovieSaved}
                                                            onAddMovie={onAddMovie}
                                                            onDeleteMovie={onDeleteMovie}/>
                                            );
                                        })
                                    )
                                    : serverError ? <p className="cards__title">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> : <p className="cards__title">Ничего не найдено</p>
                            }
                        </div>
                    )
            }
            {
                !isOnSavedPage
                && count < movies.length
                && movies.length > sizeOfPreloadedArray()
                && <MoreCards handleMore={handleMore}/>

            }
        </>
    )
}

export default MoviesCardList;
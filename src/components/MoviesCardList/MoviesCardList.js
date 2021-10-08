import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from "../Preloader/Preloader";
import MoreCards from '../MoreCards/MoreCards';

function MoviesCardList({ movies, onCardAdd, onCardDelete, isOnSavedPage, isSaved }) {

    const [isLoading, setIsLoading] = React.useState(true);
    const [index, setIndex] = React.useState(0); // сколько раз была нажата кнопка "Ещё"
    const [windowSize, setWindowSize] = React.useState(window.innerWidth);
    const [count, setCount] = React.useState(0);

    // прелоадер
    React.useEffect(() => {
        const loadingTimeout = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(loadingTimeout);
    }, []);

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
            return 12;
        } else if (windowSize < 768) {
            return 5;
        } else return 8;
    }

    // по сколько карточек добавлять при нажатии кнопки "Ещё"
    const sizeOfAddedLine = () => {
        if (windowSize >= 1280) {
            return 3;
        } else return 2;
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
                                                <MoviesCard key={movie._id} card={movie} onCardAdd={onCardAdd} onCardDelete={onCardDelete} isOnSavedPage={isOnSavedPage} isCardSaved={isSaved}/>
                                            );
                                        })
                                    )
                                    : <p className="cards__title">Ничего не найдено</p>
                            }
                        </div>
                    )
            }
            {
                count < movies.length ?
                    movies.length > sizeOfPreloadedArray() && <MoreCards handleMore={handleMore}/>
                : ""
            }
        </>
    )
}

export default MoviesCardList;
import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreCards from "../MoreCards/MoreCards";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ cards, isOnSaved, isSaved }) {
    console.log({cards: cards})
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const loadingTimeout = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(loadingTimeout);
    }, []);

    return(
        <>
            {
                isLoading ? <Preloader/>
                    : (
                        <div className="cards">
                            {
                                cards && cards.length > 0
                                    ? (
                                        cards.map((movie) => {
                                            return (
                                                <MoviesCard key={movie.id.toString()} title={movie.nameRU}
                                                            image={`https://api.nomoreparties.co${movie.image.url}`}
                                                            duration={movie.duration} isSaved={isSaved} isOnSaved={isOnSaved}/>
                                            );
                                        })
                                    )
                                    : cards === undefined ? (
                                        <p>Вы пока ничего не искали, введите ключевое слово в поиске</p>
                                    )
                                  : (
                                    <p>Ничего не найдено</p>
                                  )
                            }
                        </div>
                    )
            }
        </>
    )
}

export default MoviesCardList;
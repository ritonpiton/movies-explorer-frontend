import './MoviesCardList.css';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import initialMovies from './../../utils/initialMovies';

function MoviesCardList({ isOnSaved, isSaved }) {
    return(
        <div className="cards">
            {
                initialMovies.map((movie) => {
                    return (
                        <MoviesCard key={movie.id} title={movie.nameRU} image={`https://api.nomoreparties.co${movie.image.url}`} duration={movie.duration} isSaved={isSaved} isOnSaved={isOnSaved}/>
                    );
                })
            }
        </div>
    )
}

export default MoviesCardList;
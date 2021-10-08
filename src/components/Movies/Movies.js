import './Movies.css';
import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({whereToFind, requestedMovies, savedMovies, handleSearchMovie,onCardAdd, onCardDelete, isSaved, isShortMovieChecked}) {
    return (
        <section className="movies">
            <SearchForm whereToFind={whereToFind} handleSearch={handleSearchMovie} isShortMovieChecked={isShortMovieChecked}/>
            <MoviesCardList movies={requestedMovies} savedMovies={savedMovies} onCardAdd={onCardAdd} onCardDelete={onCardDelete} isOnSavedPage={false} isSaved={isSaved}/>
        </section>
    );
}

export default Movies;
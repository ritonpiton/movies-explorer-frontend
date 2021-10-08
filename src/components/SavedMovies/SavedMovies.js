import './SavedMovies.css';
import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ savedMovies, handleSearchMovie, isSaved, onCardDelete, isShortMovieChecked }) {
    return (
        <section className="saved-movies">
            <SearchForm whereToFind={savedMovies} handleSearch={handleSearchMovie} isShortMovieChecked={isShortMovieChecked}/>
            <MoviesCardList movies={savedMovies} isOnSavedPage={true} isSaved={isSaved} onCardDelete={onCardDelete}/>
        </section>
    );
}

export default SavedMovies;
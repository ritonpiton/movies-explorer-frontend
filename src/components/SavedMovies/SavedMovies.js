import './SavedMovies.css';
import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ whereToFind, handleSearchMovie, isSaved, onCardDelete, isShortMovieChecked }) {
  const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    return (
        <section className="saved-movies">
            <SearchForm whereToFind={whereToFind} handleSearch={handleSearchMovie} isShortMovieChecked={isShortMovieChecked}/>
            <MoviesCardList movies={savedMovies} isOnSavedPage={true} isSaved={isSaved} onCardDelete={onCardDelete}/>
        </section>
    );
}

export default SavedMovies;
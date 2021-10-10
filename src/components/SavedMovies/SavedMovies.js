import './SavedMovies.css';
import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ movies, savedMovies, whereToFind, handleSearch, isShortMovieChecked, isMovieSaved, onDeleteMovie }) {
    return (
        <section className="saved-movies">
            <SearchForm whereToFind={whereToFind}
                        handleSearch={handleSearch}
                        isShortMovieChecked={isShortMovieChecked} />
            <MoviesCardList movies={movies.length > 0 ? movies : savedMovies}
                            isOnSavedPage={true}
                            isMovieSaved={isMovieSaved}
                            onDeleteMovie={onDeleteMovie}/>
        </section>
    );
}

export default SavedMovies;
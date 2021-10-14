import './SavedMovies.css';
import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ movies, savedMovies, whereToFind, handleSearch, isShortMovieChecked, isMovieSaved, onDeleteMovie, serverError, isSearch, isLoading }) {
    return (
        <section className="saved-movies">
            <SearchForm whereToFind={whereToFind}
                        handleSearch={handleSearch}
                        isShortMovieChecked={isShortMovieChecked}
                        isLoading={isLoading} />
            <MoviesCardList movies={movies.length > 0 || isSearch ? movies : savedMovies}
                            isOnSavedPage={true}
                            isMovieSaved={isMovieSaved}
                            onDeleteMovie={onDeleteMovie}
                            serverError={serverError} />
        </section>
    );
}

export default SavedMovies;
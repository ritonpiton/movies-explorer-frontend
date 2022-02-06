import './Movies.css';
import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ movies, whereToFind, handleSearch, isShortMovieChecked, isMovieSaved, onAddMovie, onDeleteMovie, serverError, isLoading }) {

    return (
        <section className="movies">
            <SearchForm whereToFind={whereToFind}
                        handleSearch={handleSearch}
                        isShortMovieChecked={isShortMovieChecked}
                        isLoading={isLoading} />
            <MoviesCardList movies={movies}
                            isOnSavedPage={false}
                            isMovieSaved={isMovieSaved}
                            onAddMovie={onAddMovie}
                            onDeleteMovie={onDeleteMovie}
                            serverError={serverError} />
        </section>
    );
}

export default Movies;
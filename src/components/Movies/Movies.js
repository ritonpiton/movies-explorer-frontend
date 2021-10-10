import './Movies.css';
import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import {useHistory} from 'react-router-dom';

function Movies({ movies, whereToFind, handleSearch, isShortMovieChecked, isMovieSaved, onAddMovie, onDeleteMovie }) {
  const history = useHistory();
  React.useEffect(() => {

  }, [history])
    return (
        <section className="movies">
            <SearchForm whereToFind={whereToFind}
                        handleSearch={handleSearch}
                        isShortMovieChecked={isShortMovieChecked} />
            <MoviesCardList movies={movies}
                            isOnSavedPage={false}
                            isMovieSaved={isMovieSaved}
                            onAddMovie={onAddMovie}
                            onDeleteMovie={onDeleteMovie}/>
        </section>
    );
}

export default Movies;
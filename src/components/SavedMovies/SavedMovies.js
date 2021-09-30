import './SavedMovies.css';
import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreCards from "../MoreCards/MoreCards";
import Preloader from "../Preloader/Preloader";

function SavedMovies() {


    return (
        <section className="saved-movies">
            <SearchForm/>
            <MoviesCardList isOnSaved={true} />
            <MoreCards/>
        </section>
    );
}

export default SavedMovies;
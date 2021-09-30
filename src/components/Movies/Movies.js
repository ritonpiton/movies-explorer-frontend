import './Movies.css';
import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoreCards from "../MoreCards/MoreCards";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi";

function Movies() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [initialCards, setInitialCards] = React.useState([]); // тут хранятся все карточки из стороннего API
    /*const [requestedCards, setRequestedCards] = React.useState([]); // а тут - карточки, запрошенный пользователем*/
    const [uniqueRequestedCards, setUniqueRequestedCards] = React.useState(new Set());

    React.useEffect(() => {
        moviesApi.getInitialCards()
            .then(cardsArray => {
                setInitialCards(cardsArray);
            })
            .catch(err => console.log(err))
    }, [])

    function handleSearchMovie(request) {
        const str = request.toLowerCase();
        initialCards.map(item => {
            if (request && item.nameRU.toLowerCase().includes(str)) {
                setUniqueRequestedCards(uniqueRequestedCards.add(item));
                /*setRequestedCards([...requestedCards, item]);*/
                /*localStorage.setItem('requestedMovies', JSON.stringify(item));*/
                /*setRequestedCards(JSON.parse(localStorage.getItem('requestedMovies')));*/
            } else {
                return;
            }
        })
        /*setUniqueRequestedCards(new Set());
        console.log({unique: Array.from(uniqueRequestedCards)})*/
    }

    return (
        <section className="movies">
            <SearchForm handleSearch={handleSearchMovie}/>
            <MoviesCardList cards={Array.from(uniqueRequestedCards)} isSaved={false}/>
            <MoreCards/>
        </section>
    );
}

export default Movies;
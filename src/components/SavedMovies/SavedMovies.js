import './SavedMovies.css';
import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreCards from "../MoreCards/MoreCards";
import Preloader from "../Preloader/Preloader";

function SavedMovies() {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const loadingTimeout = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(loadingTimeout);
    }, []);

    return (
        <section className="saved-movies">
            <SearchForm/>
            {
                isLoading
                    ?
                        <Preloader/>
                    : (
                        <>
                            <MoviesCardList isOnSaved={true} />
                            <MoreCards/>
                        </>
                    )

            }
        </section>
    );
}

export default SavedMovies;
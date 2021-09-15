import './Movies.css';
import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoreCards from "../MoreCards/MoreCards";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies() {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const loadingTimeout = setTimeout(() => setIsLoading(false), 3000);
        return () => clearTimeout(loadingTimeout);
    }, []);

    return (
        <section className="movies">
            <SearchForm/>
            {
                isLoading
                ?
                    <Preloader/>
                : (
                    <>
                        <MoviesCardList isSaved={false}/>
                        <MoreCards/>
                    </>
                )

            }
        </section>
    );
}

export default Movies;
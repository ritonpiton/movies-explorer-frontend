import React from 'react';
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Movies from "../Movies/Movies";

function Main({ loggedIn }) {
    return (
        <main className="main">
            {
                loggedIn
                ? (
                    <Movies />
                )
                : (
                    <>
                        <Promo />
                        <AboutProject />
                        <Techs />
                        <AboutMe />
                        <Portfolio />
                    </>
                 )
            }
        </main>

    );
}

export default Main;
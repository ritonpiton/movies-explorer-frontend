import React from 'react';
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import {Redirect} from 'react-router-dom';

function Main({ loggedIn }) {
    return (
        <main className="main">
            {
                loggedIn
                ? (
                    <Redirect to='/movies'></Redirect>
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
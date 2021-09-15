import './AboutMe.css';
import React from 'react';
import myPhoto from "../../images/me.jpg";

function AboutMe() {
    return (
        <section className="about">
            <h2 className="about__title">Студент</h2>
            <div className="about__container">
                <img className="about__photo" src={myPhoto} alt="Моя фотография"/>
                <h3 className="about__name">Маргарита</h3>
                <p className="about__profession">Почти фронтенд-разработчица, 25 лет</p>
                <p className="about__text">Родилась в городе Сургут, в 2013 году переехала в Санкт-Петербург. Имею неоконченное высшее ИТМО. С 2017 года работаю парикмахером. Хочу развиваться в этой области, потому что мне это нравится и  меня это получается.</p>
                <ul className="about__links">
                    <li><a className="link about__link" href="https://t.me/piton_piton" target="_blank" rel="noreferrer">Telegram</a></li>
                    <li><a className="link about__link" href="https://github.com/ritonpiton" target="_blank" rel="noreferrer">Git</a></li>
                </ul>
            </div>
        </section>
    );
}

export default AboutMe;
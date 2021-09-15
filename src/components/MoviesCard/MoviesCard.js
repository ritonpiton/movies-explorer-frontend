import './MoviesCard.css';
import React from 'react';
import savedIcon from '../../images/saved-icon.svg';
import deleteIcon from '../../images/delete-icon.svg';

function MoviesCard({image, title, duration, isSaved, isOnSaved, onCardSave, onCardDelete}) {
    return(
        <div className="card">
            <img src={image} alt={title} className="card__image"/>
            <h3 className="card__title">{title}</h3>
            <p className="card__duration">{duration} минут</p>
            {   isOnSaved ? (
                    <button className="button card__status card__status_delete" onClick={onCardDelete}>
                        <img className="card__status-icon" src={deleteIcon} alt="Удалить" />
                    </button>
                )
                : isSaved ? (
                    <div className="card__status card__status_saved">Сохранено</div>
                )
                : (
                    <button className="button card__status card__status_not-saved" onClick={onCardSave}>
                        <img className="card__status-icon" src={savedIcon} alt="Сохранить" />
                    </button>
                )
            }

        </div>
    )
}

export default MoviesCard;
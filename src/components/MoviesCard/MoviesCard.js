import './MoviesCard.css';
import React from 'react';
import savedIcon from '../../images/saved-icon.svg';
import deleteIcon from '../../images/delete-icon.svg';
import {Link} from 'react-router-dom';

function MoviesCard({card, isOnSavedPage, isMovieSaved, onAddMovie, onDeleteMovie }) {
  const [isAdded, setIsAdded] = React.useState(false);

  const [mins, setMins] = React.useState(0);
  const [hours, setHours] = React.useState(0);

  React.useEffect(()=>{
    setIsAdded(isMovieSaved(card));
  }, [])

  React.useEffect(()=>{
    if (card.duration < 60) {
      setHours(0);
      setMins(card.duration);
    }
    else {
      setHours(Math.floor(card.duration / 60));
      setMins(Math.floor(card.duration % 60));
    }
  }, [])

  function handleAddMovie() {
    onAddMovie(card);
    setIsAdded(true);
  }

  function handleDeleteMovie() {
    onDeleteMovie(card);
    setIsAdded(false);
  }

  return(
      <div className="card">
        <a className="card__link" href={isOnSavedPage ? card.trailer : card.trailerLink} target="_blank"><img src={isOnSavedPage ? `${card.image}` : `https://api.nomoreparties.co${card.image.url}`} alt={card.nameRU} className="card__image"/></a>
          <h3 className="card__title">{card.nameRU}</h3>
          <p className="card__duration">{hours !== 0 ? `${hours} ч ${mins} мин` : `${mins} мин`}</p>
          {   isOnSavedPage ? (
                  <button className="button card__status card__status_delete" onClick={handleDeleteMovie}>
                      <img className="card__status-icon" src={deleteIcon} alt="Удалить" />
                  </button>
              )
              : isAdded ? (
                <button className="card__status card__status_saved" onClick={handleDeleteMovie}>Сохранено</button>
              )
              : (
                  <button className="button card__status card__status_not-saved" onClick={handleAddMovie}>
                      <img className="card__status-icon" src={savedIcon} alt="Сохранить" />
                  </button>
              )
          }

      </div>
  )
}

export default MoviesCard;
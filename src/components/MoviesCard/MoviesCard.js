import './MoviesCard.css';
import React from 'react';
import savedIcon from '../../images/saved-icon.svg';
import deleteIcon from '../../images/delete-icon.svg';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard({card, onCardAdd, onCardDelete, isOnSavedPage, isCardSaved}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isAdded, setIsAdded] = React.useState(false);

  const [mins, setMins] = React.useState(0);
  const [hours, setHours] = React.useState(0);

  React.useEffect(()=>{
    setIsAdded(isCardSaved(card));
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

  function handleCardAdd() {
    onCardAdd(card);
    setIsAdded(true);
  }

  function handleCardDelete() {
    onCardDelete(card);
    setIsAdded(false);
  }

  return(
      <div className="card">
          <img src={isOnSavedPage ? `${card.image}` : `https://api.nomoreparties.co${card.image.url}`} alt={card.nameRU} className="card__image"/>
          <h3 className="card__title">{card.nameRU}</h3>
          <p className="card__duration">{hours != 0 ? `${hours} ч ${mins} мин` : `${mins} мин`}</p>
          {   isOnSavedPage ? (
                  <button className="button card__status card__status_delete" onClick={handleCardDelete}>
                      <img className="card__status-icon" src={deleteIcon} alt="Удалить" />
                  </button>
              )
              : isAdded ? (
                <button className="card__status card__status_saved" onClick={handleCardAdd}>Сохранено</button>
              )
              : (
                  <button className="button card__status card__status_not-saved" onClick={handleCardAdd}>
                      <img className="card__status-icon" src={savedIcon} alt="Сохранить" />
                  </button>
              )
          }

      </div>
  )
}

export default MoviesCard;
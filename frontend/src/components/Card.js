import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Card({ card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-btn ${isLiked && 'card__like-btn_active'}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <li className="card">
      <button className="card__delete-btn" hidden={!isOwn} onClick={handleDeleteClick}></button>
      <img className="card__photo" src={card.link} alt={card.name}  onClick={handleClick}/>
      <div className="card__place">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="card__like-counter">{card.likes.length ? card.likes.length : ''}</span>
        </div>
      </div>
    </li>
  )
}

export default Card
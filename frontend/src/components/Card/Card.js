import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const userData = useContext(CurrentUserContext);

  const isOwn = card.owner._id === userData._id;
  const isLiked = card.likes.some(like => like._id === userData._id);
  const cardLikeButtonClassName = (
    `card__like ${isLiked ? 'like_active' : ''}`
  );
  
  return (
    <li className="card">
      <img 
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={() => onCardClick(card)}
      />
      <div className="card__info">
        <h3 className="card__name">{card.name}</h3>
        <div className="card__like-wrapper">
          <button 
            type="button" 
            aria-label="Лайк" 
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)}>

          </button>
          <span className="card__like-number">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && 
      <button 
        type="button" 
        aria-label="Удалить карточку" 
        className="card__trash-button clickable"
        onClick={() => onCardDelete(card)}>
      </button>}
    </li>    
  )
};

export default Card;
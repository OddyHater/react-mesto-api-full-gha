import React from "react";

function ImagePopup({card, onClose}) {  
  const isOpen = Boolean(card);
  return(
    <div className={isOpen ? 'popup popup-image popup_opened' : 'popup popup-image'}>
      <div className="popup-image__container popup__container">
        <figure className="popup-image__picture-set">
          <img src={card?.link} alt={card?.name} className="popup-image__image"/>
          <figcaption className="popup-image__caption">{card?.name}</figcaption>
        </figure>
        <button 
          type="button" 
          aria-label="Закрыть" 
          className="popup__close-button clickable"
          onClick={onClose}>
          
        </button>
      </div>
    </div>
  )
}

export default ImagePopup;
import React from "react";
import { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  
  const [cardName, setCardName] = useState('');
  const [cardLink, setCardLink] = useState('');
  
  function handleCardNameChange(evt) {
    setCardName(evt.target.value);
  }

  function handleCardLinkChange(evt) {
    setCardLink(evt.target.value);
  }

  function handleAddPlace(evt) {
    evt.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardLink
    })
  }

  useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]);

  return(

  <PopupWithForm
    name="new-card"
    title="Новое место"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleAddPlace}
    buttonText="Создать">
    
    <input
      type="text"
      name="name"
      className="popup__input popup__input_type_name"
      id="card-name"
      placeholder="Название"
      required 
      minLength="2"
      maxLength="30"
      value={cardName}
      onChange={handleCardNameChange}
    />

    <span
      className="card-name-error">
    </span>

    <input
      type="url"
      name="link"
      className="popup__input popup__input_type_description"
      placeholder="Ссылка на картинку"
      required 
      id="card-url"
      value={cardLink}
      onChange={handleCardLinkChange}
    />

    <span
      className="card-url-error">
    </span>

  </PopupWithForm>
  )
}

export default AddPlacePopup;
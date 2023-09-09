import React from "react";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  
  const [name,setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    })
  }

  useEffect(() => {
    setName(currentUser.name || ''); //избегаем ошибок, пока currentUser не получен
    setDescription(currentUser.about || '');
  }, [currentUser, isOpen]);

  return(
    <PopupWithForm
      title='Редактировать профиль'
      name='profile'
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}>
      
      <input type="text"
        name="name"
        className="popup__input popup__input_type_name"
        id="profile-name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
      />

      <span 
        className="profile-name-error">
      </span>

      <input 
        type="text"
        name="link"
        className="popup__input popup__input_type_description"
        id="profile-email"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionChange}
      />

      <span
        className="profile-email-error">
      </span>          

    </PopupWithForm>
  )
}

export default EditProfilePopup;
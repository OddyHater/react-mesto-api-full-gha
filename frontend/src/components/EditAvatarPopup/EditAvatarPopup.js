import React from "react";
import { useRef, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onAvatarUpdate}) {

  const avatarRef = useRef();
 
  function handleSubmit(evt) {
    evt.preventDefault();

    onAvatarUpdate({
      avatar: avatarRef.current.value 
    })
  } 

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return(

    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}>

      <input
        type="url"
        name="link"
        className="popup__input popup__input_type_description"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
        id="avatar-link"
      />

      <span
        className="avatar-link-error">
      </span>

    </PopupWithForm>
  )
}

export default EditAvatarPopup;
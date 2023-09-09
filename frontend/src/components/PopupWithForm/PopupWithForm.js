import React from "react";

function PopupWithForm({title, name, children, isOpen, onClose, buttonText, onSubmit}) {
  return(
    <div className={
      isOpen ? `popup popup-${name} popup_opened` : 
      `popup popup-${name}`}>

      <div className={`popup__container popup-${name}__container`}>

        <h2 
          className="popup__title">
            {title}
        </h2>

        <form 
          name={name} 
          className="popup__form"
          onSubmit={onSubmit}>
            {children}
          <button
            type="submit"
            className="popup__submit">
              {buttonText}
            </button>
        </form>

        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-button clickable"
          onClick={onClose} />

      </div>

    </div>
    )
}

export default PopupWithForm;

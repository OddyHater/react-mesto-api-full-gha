import React from 'react';
import success from '../../images/svg/success.svg';
import cancel from '../../images/svg/cancel.svg';

const InfoTooltip = ({isOpen, name, title, imageStatus, onClose}) => {
  const imageIcon = imageStatus ? success : cancel;
  const altText = imageStatus ? 'success icon' : 'cancel icon';
  return (
    <div className={
        isOpen ? `popup popup-${name} popup_opened` : 
        `popup popup-${name}`}>

        <div className={`popup__container popup-${name}__container`}>

          <img src={imageIcon} alt={altText} className={`popup-${name}__image`} />

          <h2 
            className={`popup-${name}__title`}>
              {title}
          </h2>

          <button
            type="button"
            aria-label="Закрыть"
            className="popup__close-button clickable"
            onClick={onClose}>

          </button>

        </div>

      </div>
  )
};

export default InfoTooltip;

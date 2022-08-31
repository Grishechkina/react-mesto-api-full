import React from 'react';

function ImagePopup({card, onClose}) {

  function closeByOverlay(event) {
    if (event.target.classList.contains('pop-up_opened')) {
      onClose()
    }
  }

  return (
    <div className={`pop-up img-pop-up${Object.keys(card).length > 0 ? ' pop-up_opened' : ''}`} onClick={closeByOverlay}>
      <figure className="img-pop-up__container">
        <button className="pop-up__close-btn" onClick={onClose}/>
        <img className="img-pop-up__photo" src={card.link} alt={card.name}/>
        <figcaption className="img-pop-up__title">{card.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup
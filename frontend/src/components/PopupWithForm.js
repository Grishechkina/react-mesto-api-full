import React from 'react';

function PopupWithForm(props) {

  function closeByOverlay(event) {
    if (event.target.classList.contains('pop-up_opened')) {
      props.onClose()
    }
  }

  return (
    <div className={`pop-up ${props.popupName}${props.isOpen ? ' pop-up_opened' : ''}`} onClick={closeByOverlay}>
      <div className="pop-up__container" >
        <button className="pop-up__close-btn" onClick={props.onClose}/>
        <h2 className="pop-up__title">{props.popupHeader}</h2>
        <form className={`pop-up__${props.formName} form`} name={props.formName} 
          onSubmit={props.onSubmit}>
          {props.children}
          <button className="form__save-btn classic-btn" type="submit">
            {props.isLoading ? 'Сохранение...' : 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
import React from 'react';

function ConfirmPopup(props) {
  return (
    <div className="pop-up confirm-pop-up">
      <div className="pop-up__container">
        <button className="pop-up__close-btn"></button>
        <h2 className="pop-up__title">{props.title}</h2>
        <button className="classic-btn">{props.btnText}</button>
      </div>
    </div>
  )
}

export default ConfirmPopup
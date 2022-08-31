function InfoTooltip(props) {

  function closeByOverlay(event) {
    if (event.target.classList.contains('pop-up_opened')) {
      props.onClose()
    }
  }

  return (
    <div className={`pop-up info-tooltip-pop-up${props.isOpen ? ' pop-up_opened' : ''}`} onClick={closeByOverlay}>
      <div className="pop-up__container" >
        <button className="pop-up__close-btn" onClick={props.onClose} />
        <div className={`info-tooltip-pop-up__icon${props.status === 'ok' ? ' info-tooltip-pop-up__icon_ok' : ' info-tooltip-pop-up__icon_error'}`} />
        <h1 className="info-tooltip-pop-up__title">
          {props.status === 'ok' ? 'Вы успешно зарегистрировались!' :
            'Что-то пошло не так! Попробуйте ещё раз.'}
        </h1>
      </div>
    </div>
  )
}

export default InfoTooltip;
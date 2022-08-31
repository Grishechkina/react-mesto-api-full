import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    if (props.isOpen) {
      setName('')
      setLink('')
    }
  }, [props.isOpen])

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link
    })
  }

  return (
    <PopupWithForm
      popupHeader="Новое место"
      popupName="add-card-pop-up"
      formName="add-card-form"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}>
      <label className="form__field">
        <input type="text" id="place" name="name" placeholder="Название" className="form__input" required
          minLength="2" maxLength="30" onChange={handleNameChange} value={name} />
        <span className="name-input-error form__input-error" />
      </label>
      <label className="form__field">
        <input type="url" id="link" name="link" placeholder="Ссылка на картинку" className="form__input"
          required onChange={handleLinkChange} value={link} />
        <span className="link-input-error form__input-error" />
      </label>
    </PopupWithForm>
  )
}
export default AddPlacePopup
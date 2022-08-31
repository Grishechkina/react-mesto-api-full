import { useState } from 'react';
import { Link } from 'react-router-dom'

function AuthForm(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({ email, password })
  }

  return (
    <div className='auth-page'>
      <div className="auth-form">
        <h2 className="auth-form__title">{props.title}</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label className="form__field">
            <input type="email" id="email" name="name" placeholder="Email" className="form__input form__input_dark-theme"
              onChange={handleEmailChange} value={email} required />
            <span className="name-input-error form__input-error" />
          </label>
          <label className="form__field">
            <input type="password" id="password" name="link" placeholder="Пароль" className="form__input form__input_dark-theme"
              onChange={handlePasswordChange} value={password} required />
            <span className="link-input-error form__input-error" />
          </label>
          <button className="auth-form__save-btn classic-btn classic-btn_dark-theme" type="submit">
            {props.saveBtnText}
          </button>
          {props.saveBtnSubtitle && props.saveBtnSubtitle.length && <Link to="/sign-in" className="auth-form__save-btn-subtitle">{props.saveBtnSubtitle}</Link>}
        </form>
      </div>
    </div>

  )
}

export default AuthForm;

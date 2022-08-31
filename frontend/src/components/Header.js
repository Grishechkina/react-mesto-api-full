import React from 'react';
import logo from '../images/mesto-logo.svg'
import { Link, Route, Routes } from 'react-router-dom'

function Header({ email, toggleIsLoggedIn }) {

  function handleSignOut() {
    localStorage.removeItem('token')
    toggleIsLoggedIn(false)
  }

  return (
    <header className="header page__header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="Mesto лого" />
      </Link>
      <Routes>
        <Route exact path="/"
          element={
            <div className="header__user-info">
              <p className="header__user-login">{email}</p>
              <Link className="header__link" onClick={handleSignOut} to="/sign-in">
                Выйти
              </Link>
            </div>
          }
        />

        <Route
          path="/sign-up"
          element={<Link className="header__link" to="/sign-in">Войти</Link>}
        />

        <Route
          path="/sign-in"
          element={<Link className="header__link" to="/sign-up">Регистрация</Link>}
        />
      </Routes>
    </header>
  )
}

export default Header;
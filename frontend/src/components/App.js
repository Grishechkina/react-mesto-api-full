import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import ConfirmPopup from './ConfirmPopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import InfoTooltip from './InfoTooltip'
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Login from './Login'
import Register from './Register'
import * as auth from '../utils/auth';

function App() {

  const [currentUser, setCurrentUser] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  const [registrationStatus, setRegistrationStatus] = useState('')
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigate();

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

  useEffect(() => {
    tokenCheck()
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      navigation('/')
      api.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData)
        })
        .catch(err => console.log(err));

      api.getInitialCards()
        .then((cards) => {
          setCards(cards)
        })
        .catch(err => console.log(err));
    } else {
      setUserEmail('')
    }
  }, [isLoggedIn])

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function tokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setUserEmail(res.data.email)
          }
        })
        .catch(err => console.log(err));;
    }
  }

  function handleLogin({ email, password }) {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          tokenCheck()
        }
      })
      .catch(err => console.log(err));
  }

  function handleRegistration({ email, password }) {
    auth.register(email, password)
      .then(() => {
        changeRegStatus('ok')
        navigation('/sign-in');
      })
      .catch((err) => {
        changeRegStatus('error')
        console.log(err)
      });
  }

  function changeRegStatus(status) {
    setRegistrationStatus(status)
    setIsInfoTooltipPopupOpen(true)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.handleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(user) {
    setIsLoading(true)
    api.editUserInfo(user)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(avatarLink) {
    setIsLoading(true)
    api.changeAvatar(avatarLink)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleAddPlace(place) {
    setIsLoading(true)
    api.addNewCard(place)
      .then(res => {
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsInfoTooltipPopupOpen(false)
    setSelectedCard({})
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={userEmail} toggleIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onSubmit={handleRegistration} />}
          />
          <Route
            path="/sign-in"
            element={<Login onSubmit={handleLogin} />}
          />
          <Route
            path='/'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onAddPlace={handleAddPlaceClick}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete} />
              </ProtectedRoute>
            } />
        </Routes>
        {isLoggedIn && <Footer />}
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          status={registrationStatus}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} />
        <ConfirmPopup title="Вы уверены?" btnText="Да" />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

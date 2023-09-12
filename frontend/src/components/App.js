import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import Login from './Login/Login';
import Register from './Register/Register';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

import PopupWithForm from './PopupWithForm/PopupWithForm';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
import ImagePopup from './ImagePopup/ImagePopup';
import InfoTooltip from './InfoTooltip/InfoTooltip';

import AppApi from '../utils/api';
import AuthApi from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardsContext';


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [userData, setUserData] = useState({
    _id: '',
    email: ''
  })

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [infoTitle, setInfoTitle] = useState('');
  const [InfoImageStatus, setInfoImageStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setIsInfoPopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      AuthApi.checkToken(token)
        .then((res) => {
          setUserData({
            ...userData,
            _id: res.user._id,
            email: res.user.email,
          })
          setLoggedIn(true);
          navigate('/', {replace: true});
        })
        .catch((err) => console.log(err));
      }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      AppApi.getProfileInfo()
      .then((res) => {
        setCurrentUser(res.user);
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      AppApi.getInitialCards()
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);


  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    if(isLiked) {
      AppApi.removeLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) =>  c._id === card._id ? newCard.data : c))
        })
        .catch((err) => console.log(err));
    } else {
      AppApi.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c))
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete(card) {
    AppApi.removeCardFromServer(card._id)
      .then(() => {
        setCards((prev) => {

         return(
          prev.filter((c) => {
            return (c._id !== card._id);
          })
         )
        });
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {

    const newState = Object.assign(currentUser);

    newState.name = data.name;
    newState.about = data.about;

    AppApi.changeProfileInfo(data)
      .then((res) => {
        console.log(res);
        setCurrentUser(newState);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAvatarUpdate(data) {

    const newState = Object.assign(currentUser);

    newState.avatar = data.avatar;

    AppApi.changeAvatar(data.avatar)
      .then(() => {
        setCurrentUser(newState);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegiser({email, password}) {
    if(!email || !password) {
      return;
    };

    AuthApi.regiser({email, password})
      .then((res) => {
        if(res.data) {
          setInfoTitle('Вы успешно зарегистрировались!');
          setInfoImageStatus(true);
          navigate('/sign-in', {replace: true});
        } else {
          setInfoTitle('Что-то пошло не так! Попробуйте ещё раз.');
          setInfoImageStatus(false);
        }
      })
      .catch((err) => {
        setInfoTitle('Что-то пошло не так! Попробуйте ещё раз.');
        setInfoImageStatus(false);
      })
      .finally(() => {
        setIsInfoPopupOpen(true);
      });
  }

  function handleLogin({email, password}) {
    if(!email || !password) {
      return;
    }

    AuthApi.login({email, password})
      .then((res) => {
        if(!res) {
          return
        }
        localStorage.setItem('token', res.token);

        setLoggedIn(true);
        navigate('/', {replace: true});
      })
      .catch((err) => console.log(err));
  }

  function handleLoggout() {
    localStorage.removeItem('token');
    setUserData({
      ...userData,
      _id: '',
      email: ''
    })
    setLoggedIn(false);
  }

  async function handleAddPlace(newCardData) {
    /*актуализируем стейт
    напрямую с сервера*/
    try {
      await AppApi.pushCardToServer(newCardData);
      const res = await AppApi.getInitialCards();
      setCards(res.data);
      closeAllPopups();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>

      <Header
        email={userData.email}
        handleLoggoutButtonClick={handleLoggout}
      />

      <Routes>

        <Route path="/" element={<ProtectedRoute
          element={Main}
          loggedIn={loggedIn}
          onEditProfile={() => {setEditProfilePopupOpen(true)}}
          onAddPlace={() => {setAddPlacePopupOpen(true)}}
          onEditAvatar={() => {setEditAvatarPopupOpen(true)}}
          onCardClick={(card) => handleCardClick(card)}
          onCardLike={(card) => handleCardLike(card)}
          onCardDelete={(card) => handleCardDelete(card)}
        />} />

        <Route path="/sign-up" element={<Register onSubmit={handleRegiser} />} />

        <Route path="/sign-in" element={<Login onSubmit={handleLogin} />} />

      </Routes>

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onAvatarUpdate={handleAvatarUpdate}
      />

      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        onClose={closeAllPopups}
        buttonText="Да">
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <InfoTooltip
        isOpen={isInfoPopupOpen}
        onClose={closeAllPopups}
        name={'info'}
        title={infoTitle}
        imageStatus={InfoImageStatus}
      />

      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

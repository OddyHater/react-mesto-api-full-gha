import React from "react";
import logoPath from '../../images/svg/logo-white.svg';
import { Routes, Route, Link } from "react-router-dom";

function Header({email, handleLoggoutButtonClick}) {
  return (
    <header className="header">
        <Link to="/" className="header__link">
          <img src={logoPath} alt="Логотип Место" className="header__logo"/>
        </Link>
        <div className="header__button-container">

          <Routes>

            <Route path="/" element={
              <>
              <p className="header__email">{email}</p>
              <button
                type="button"
                onClick={handleLoggoutButtonClick}
                className="header__button"
              >Выйти
              </button>
              </>
            }>              
            </Route>

            <Route path="/sign-in" element={
              <Link to="/sign-up" className="header__route-link">
                Регистрация
              </Link>
            }>
            </Route>

            <Route path="/sign-up" element={
              <Link to="/sign-in" className="header__route-link">
                Войти
              </Link>
            }>
            </Route>
          </Routes>

        </div>
    </header>
  );
}

export default Header;
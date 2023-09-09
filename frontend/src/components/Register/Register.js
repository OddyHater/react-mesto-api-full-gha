import React from 'react';
import { useState} from 'react';
import { Link } from 'react-router-dom';

const Register = ({onSubmit}) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const handleFormChange = (evt) => {
    const {name, value} = evt.target;

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const onRegister = (evt) => {
    evt.preventDefault();

    onSubmit(formValue);
  }


  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={onRegister}>
        <input
          type="email"
          name="email"
          value={formValue.email}
          className="login__input login__input_type_email"
          placeholder="Email"
          onChange={handleFormChange}
        />

        <input
          type="password"
          name="password"
          value={formValue.password}
          className="login__input login__input_type_password"
          placeholder="Пароль"
          onChange={handleFormChange}
        />
        <button 
          type="submit"
          value="Submit"
          className="login__submit"
        >
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="login__description">Уже зарегистрированы? Войти</Link>
      </form>
    </div>
  );
};

export default Register;
import React from 'react';
import { useState } from 'react';

const Login = ({onSubmit}) => {

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

  const onLogin = (evt) => {
    evt.preventDefault();

    onSubmit(formValue);
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={onLogin}>
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
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
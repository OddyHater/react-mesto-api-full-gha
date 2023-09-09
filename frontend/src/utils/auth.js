class Auth {
  constructor(baseUrl) {
    this._url = baseUrl
  }

  _getResponseData(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  regiser({email, password}) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({password, email})
    })
    .then(res => {      
      return this._getResponseData(res);
    })
  }

  login({email, password}) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    })
    .then(res => {      
      return this._getResponseData(res);
    })
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res => {      
      return this._getResponseData(res);
    })
  }
}

const AuthApi = new Auth('https://auth.nomoreparties.co');

export default AuthApi;
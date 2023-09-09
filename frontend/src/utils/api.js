class Api {
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if(res.ok) {       
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfileInfo() {
    return fetch(`https://${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => {        
        return this._getResponseData(res);
      });
  }

  changeProfileInfo(item) {
    return fetch(`https://${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    })
    .then(res => {
      return this._getResponseData(res);
    })
    .catch(err => {
      console.log(err);
    });
  }

  pushCardToServer({name, link, like, id}) {
    return fetch(`https://mesto.${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
        like: like,
        _id: id
      })
    })
    .then(res => {
      return this._getResponseData(res);
    });
  }

  removeCardFromServer(cardID) {
    return fetch(`https://mesto.${this._url}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }

  addLike(cardId) {
    return fetch(`https://mesto.${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }

  removeLike(cardId) {
    return fetch(`https://mesto.${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE', 
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }

  changeAvatar(link) {  
    return fetch(`https://mesto.${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }

  getInitialCards() {
    return fetch(`https://mesto.${this._url}/cards`, {
      headers: this._headers
    })
    .then(res => {      
      return this._getResponseData(res);
    })
  }
}

const AppApi = new Api({
  baseUrl: 'nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '49fa0164-6f79-4747-b9b7-a7fde6f409fd',
    'Content-type': 'application/json'
  }
});

export default AppApi;
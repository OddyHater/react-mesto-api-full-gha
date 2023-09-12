class Api {
  constructor({baseUrl}) {
    this._url = baseUrl;
  }

  _getResponseData(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfileInfo() {
    return fetch(`https://${this._url}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json'
      },
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  changeProfileInfo(item) {
    return fetch(`https://${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json'
      },
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
    return fetch(`https://${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json'
      },
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
    return fetch(`https://${this._url}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json'
      },
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }

  addLike(cardId) {
    return fetch(`https://${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json'
      },
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }

  removeLike(cardId) {
    return fetch(`https://${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json'
      },
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }

  changeAvatar(link) {
    return fetch(`https://${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => {
      return this._getResponseData(res);
    })
  }

  getInitialCards() {
    return fetch(`https://${this._url}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json'
      },

    })
    .then(res => {
      return this._getResponseData(res);
    })
  }
}

const AppApi = new Api({
  baseUrl: 'api.mentor.oddyhater.nomoredomainsicu.ru'
});

export default AppApi;

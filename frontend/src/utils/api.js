class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl
    this.options = {headers: options.headers, credentials: 'include'};
  }

  getUserInfo() {
    console.log(this.options)
    return fetch(this.baseUrl + '/users/me', this.options)
      .then(this._checkServerResp)
  }

  getInitialCards() {
    return fetch(this.baseUrl + '/cards', this.options)
      .then(this._checkServerResp)
  }

  editUserInfo(body) {
    this._createOptions('PATCH', body)
    return fetch(this.baseUrl + '/users/me', this.options)
      .then(this._checkServerResp)
  }

  addNewCard(body) {
    this._createOptions('POST', body)
    return fetch(this.baseUrl + '/cards', this.options)
      .then(this._checkServerResp)
  }

  deleteCard(id) {
    this._createOptions('DELETE', {})
    return fetch(`${this.baseUrl}/cards/${id}`, this.options)
      .then(this._checkServerResp)
  }

  handleLike(id, isLiked) {
    if(isLiked) {
      this._createOptions('DELETE', {})
      return fetch(`${this.baseUrl}/cards/${id}/likes`, this.options)
        .then(this._checkServerResp)
    }
    this._createOptions('PUT', {})
    return fetch(`${this.baseUrl}/cards/${id}/likes`, this.options)
      .then(this._checkServerResp)
  }

  changeAvatar(body) {
    this._createOptions('PATCH', body)
    return fetch(`${this.baseUrl}/users/me/avatar`, this.options)
      .then(this._checkServerResp)
  }

  _createOptions(method, body) {
    this.options.method = method
    this.options.body = JSON.stringify(body)
  }

  _checkServerResp(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: 'https://api.paw.patrol.nomoredomains.sbs',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default api
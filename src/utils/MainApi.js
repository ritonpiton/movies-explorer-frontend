export const BASE_URL = '//localhost:3001'
//export const BASE_URL = '//api.mesto.frontend.domain.nomoredomains.rocks';

const checkResponse = (res) => {
    if (res.ok) return res.json();
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(res => checkResponse(res))
}

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
    })
        .then(res => checkResponse(res))
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => checkResponse(res))
        .then(data => data)
}

export const getUserInfo = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then(res => checkResponse(res))
}

export const setUserInfo = (data, token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email
        })
    })
        .then(res => checkResponse(res))
}

export const getSavedCards = (token) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
      .then(res => checkResponse(res))
}

export const addCard = (card, token) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            country: card.country || 'country',
            director: card.director || 'director',
            duration: card.duration || 0,
            year: card.year || 0,
            description: card.description || 'description',
            image: `https://api.nomoreparties.co${card.image.url}` || 'image',
            trailer: card.trailerLink || 'trailer',
            thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}` || 'thumbnail',
            movieId: card.id ,
            nameRU: card.nameRU || 'nameRU',
            nameEN: card.nameEN || 'nameEN',
        })
    })
      .then(res => checkResponse(res))
}

export const deleteCard = (cardId, token) => {
    return fetch(`${BASE_URL}/movies/${cardId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
      .then(res => checkResponse(res))
}

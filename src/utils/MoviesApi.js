export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const checkResponse = (res) => {
    if (res.ok) return res.json();
}

export const getInitialCards = () => {
    return fetch(`${BASE_URL}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => checkResponse(res))
}
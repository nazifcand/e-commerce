import request from './base.service'

export const fetchCart = () => {
  return request
    .get('/cart/')
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const addCartItem = listingIDs => {
  return request
    .post('/cart/add/', listingIDs)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const removeCartItem = favouriteIDs => {
  return request
    .post('/cart/delete/', favouriteIDs)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

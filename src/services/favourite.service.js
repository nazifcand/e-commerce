import request from './base.service'

export const fetchFavourites = () => {
  return request
    .get('/favourites/')
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const addFavourite = listingIDs => {
  return request
    .post('/favourites/add/', listingIDs)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const removeFavourite = favouriteIDs => {
  return request
    .post('/favourites/delete/', favouriteIDs)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

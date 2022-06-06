import request from './base.service'

export const fetchListings = (filters) => {
  return request
    .get('/listings/', { params: { status: 'online', page: 1, page_size: 25, ...filters } })
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const createListing = (productID, data) => {
  return request
    .post(`/products/${productID}/add-listing/`, data)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const fetchListing = (listingID) => {
  return request
    .get(`/listings/${listingID}/`)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const updateListing = (listingID, data) => {
  return request
    .put(`/products/update-listing/${listingID}/`, data)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const removeListing = (listingID) => {
  return request
    .delete(`/products/delete-listing/${listingID}/`)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

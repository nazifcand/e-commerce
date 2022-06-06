import request from './base.service'

export const fetchMyAccount = () => {
  return request
    .get('/authorization/')
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const fetchMe = () => {
  return request
    .get(`/me/`)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const updateMe = (data) => {
  return request
    .patch(`/me/`, data)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const changePassword = data => {
  return request
    .put('/change-password/', data)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const forgotPassword = data => {
  return request
    .post('/forgot-password/', data)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const resetPassword = data => {
  return request
    .post('/reset-password/', data)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const fetchAddresses = (filters) => {
  return request
    .get('/addresses/', { params: { page_size: 25, ...filters } })
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const createAddress = data => {
  return request
    .post('/addresses/', data)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const removeAddress = addressID => {
  return request
    .delete(`/addresses/${addressID}/`)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}
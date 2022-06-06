import request from './base.service'

export const uploadImages = data => {
  return request
    .post('/images/', data)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const uploadDocument = data => {
  return request
    .post('/documents/', data)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}
import request from './base.service'

export const login = (data) => {
  return request
    .post('/login/', data)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const register = (data) => {
  return request
    .post('/register/', data)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const fetchSearch = (search) => {
  return request
    .get('/search/', { params: { search } })
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const fetchCargoCompanies = () => {
  return request
    .get('/cargo-companies/', { params: { page_size: 100 } })
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const fetchDocument = (docID) => {
  return request
    .get(`/documents/${docID}/`)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}
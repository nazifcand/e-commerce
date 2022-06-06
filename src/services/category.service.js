import request from './base.service'

export const fetchCategories = (filters) => {
  return request
    .get('/categories/', { params: { ...filters } })
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const fetchCategory = (categoryID) => {
  return request
    .get(`/categories/${categoryID}/`)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

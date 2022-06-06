import request from './base.service'

export const fetchProducts = (filters) => {
  return request
    .get('/products/', { params: { status: 'approved', status: 'approved', page: 1, page_size: 20, ...filters } })
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const fetchProduct = (productID) => {
  return request
    .get(`/products/${productID}/`)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const recommendProduct = data => {
  return request
    .post('/products/recommendation/', data)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const fetchExploreProducts = (filters) => {
  return request
    .get('/products/explore/', { params: { status: 'approved', page: 1, page_size: 6, ...filters } })
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const fetchTopSellingProducts = (filters) => {
  return request
    .get('/products/top-selling/', { params: { status: 'approved', page: 1, page_size: 12, ...filters } })
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const fetchLastWeekTopSellingProducts = (filters) => {
  return request
    .get('/products/last-week-top-selling/', { params: { status: 'approved', page: 1, page_size: 5, ...filters } })
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const fetchRecentlyVisitedProducts = (filters) => {
  return request
    .get('/products/recently-visited/', { params: { status: 'approved', page: 1, page_size: 3, ...filters } })
    .then(result => [null, result.data])
    .catch(err => [err.response])
}
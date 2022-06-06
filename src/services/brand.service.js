import request from './base.service'

export const fetchBrands = (filters) => {
  return request
    .get('/brands/', { params: { page_size: 1000, ...filters } })
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const fetchBrand = (brandID) => {
  return request
    .get(`/brands/${brandID}/`)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

import request from './base.service'

export const createOrder = (data) => {
  return request
    .post('/get-token/', data)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const fetchOrder = (orderID) => {
  return request
    .get(`/orders/${orderID}/`)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const fetchBuyingOrders = (filters) => {
  return request
    .get('/orders/buyings/', { params: { page: 1, page_size: 25, ...filters } })
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const fetchSellingOrders = (filters) => {
  return request
    .get('/orders/sellings/', { params: { page: 1, page_size: 25, ...filters } })
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const fetchContracts = data => {
  return request
    .post(`/contracts/`, data)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const completePayment = orderID => {
  return request
    .get(`/orders/${orderID}/complete-payment/`)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const setStatus = (data) => {
  return request
    .post('/orders/set-status/', data)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

export const setShipment = (data) => {
  return request
    .post('/orders/set-shipment/', data)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

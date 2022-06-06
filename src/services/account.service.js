import request from './base.service'

export const fetchCompany = (companyID) => {
  return request
    .get(`/companies/${companyID}/`)
    .then(result => [null, result.data])
    .catch(err => [err.response])
}

import moment from 'moment'

// stores
import { useMainStore } from '../stores/main.store'
const mainStore = useMainStore()

export const pageTitle = (title) => `${title} ${mainStore.settings.seperator} ${mainStore.settings.title}`

// format number
export const formatNumber = price => {
  return new Intl.NumberFormat('tr-TR')
    .format(price);
}

// format price
export const formatPrice = price => {
  return new Intl.NumberFormat(
    'tr-TR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    trailingZeroDisplay: 'stripIfInteger'
  })
    .format(+price)
}

// get value
export const getValue = (column, row) => {
  return column
    .field
    .split('.')
    .reduce((obj, item) => {
      if (!obj) {
        return row[item];
      }
      return obj[item];
    }, null);
};

export const formatDate = date => {
  return moment(date)
    .format('DD.MM.YYYY HH:mm');
}
const fields = {
  'email': 'E-posta',
  'password': 'Şifre',
  'repeat_password': 'Şifre Tekrar',
  'first_name': 'Ad',
  'last_name': 'Soyad',
  'company': 'Firma Ünvanı',
  'phone': 'Telefon',
  'company_phone': 'Firma Telefonu',
  'company_no': 'Firma Numarası',
  'short_name': 'Mağaza Kısa Ad'
}

const messages = {
  'This field may not be blank.': 'Bu alan boş bırakılamaz.',
  'Ensure this field has at least 5 characters.': '',
  'Ensure this field has no more than 8 characters.': ''
}

export const translateField = field => {
  return fields[field] ?? field;
}

export const translateMessage = message => {
  return messages[message] ?? message;
}
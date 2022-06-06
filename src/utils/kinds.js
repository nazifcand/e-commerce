export const getShipment = value => {
  const values = [
    { value: 'reverse_charge', label: 'Alıcı Ödemeli', class: 'label warning' },
    { value: 'without_charge', label: 'Satıcı Ödemeli', class: 'label success' },
  ]
  return values.find(item => item.value == value);
}

export const getCondition = value => {
  const values = [
    { value: 'very_worn', label: 'Çok yıpranmış' },
    { value: 'middle', label: 'Orta' },
    { value: 'good', label: 'İyi' },
  ]
  return values.find(item => item.value == value);
}

export const getListingStatus = value => {
  const values = [
    { value: 'online', label: 'Yayında', class: 'label success' },
    { value: 'offline', label: 'Yayında Değil', class: 'label danger' },
    { value: 'waiting', label: 'Onay bekliyor', class: 'label info' },
    { value: 'waiting_image', label: 'Resim Bekliyor', class: 'label info' },
  ]
  return values.find(item => item.value == value);
}

export const orderItemStatuses = [
  {
    value: 'awaiting',
    label: 'Onay Bekleniyor',
    type: 'seller',
    next: ['confirmed', 'rejected'],
  },
  {
    value: 'awaiting',
    label: 'Onay Bekleniyor',
    type: 'buyer',
    next: ['canceled'],
  },
  {
    value: 'confirmed',
    label: 'Hazırlanıyor',
    type: 'seller',
    next: ['rejected', 'shipped'],
  },
  {
    value: 'confirmed',
    label: 'Hazırlanıyor',
    type: 'buyer',
    next: ['canceled'],
  },
  {
    value: 'rejected',
    label: 'Reddedildi',
    type: 'seller',
    next: [],
  },
  {
    value: 'rejected',
    label: 'Reddedildi',
    type: 'buyer',
    next: [],
  },
  {
    value: 'canceled',
    label: 'İptal Edildi',
    type: 'buyer',
    next: [],
  },
  {
    value: 'canceled',
    label: 'İptal Edildi',
    type: 'seller',
    next: [],
  },
  {
    value: 'shipped',
    label: 'Kargoya Verildi',
    type: 'seller',
    next: [],
  },
  {
    value: 'shipped',
    label: 'Kargoya Verildi',
    type: 'buyer',
    next: ['received'],
  },
  {
    value: 'received',
    label: 'Teslim Alındı',
    type: 'buyer',
    next: [],
  },
  {
    value: 'received',
    label: 'Teslim Alındı',
    type: 'seller',
    next: [],
  },
];
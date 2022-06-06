import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    isLoading: false,
    isLoggedIn: false,
    mobile: {
      isMobile: false,
      containerWidth: 1200
    },
    categories: [],
    featuredCategories: [],
    selectedProduct: null,
    selectedCartItems: [],
    cargoCompanies: [],
    confirmModal: {
      isShow: false,
      title: 'Silmek istediğinize emin misiniz?',
      text: '',
      icon: 'fa-times-circle',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'Vazgeç',
      confirm: null,
    },
    settings: {
      title: "Medikaport",
      motto: "Motto",
      seperator: "-",
      social_medias: [],
      phone: "1",
      image: null,
      image_url: {
        id: null,
        kind: "other",
        image: "/images/default-image.jpg",
        created_at: null
      }
    },
    user: {
      first_name: '',
      last_name: '',
      email: '',
      company: '',
      phone: '',
      is_active: '',
      cart: [],
      favourites: [],
    },
    passiveNotifications: {
      new_order: 0,
      notifications: []
    },
    cities: [
      {
        "id": 1,
        "name": "Adana",
        "district": [
          { "id": 1, "name": "Aladağ" },
          { "id": 6, "name": "Ceyhan" },
          { "id": 4, "name": "Çukurova" },
          { "id": 14, "name": "Feke" },
          { "id": 8, "name": "İmamoğlu" },
          { "id": 10, "name": "Karaisalı" },
          { "id": 9, "name": "Karataş" },
          { "id": 7, "name": "Kozan" },
          { "id": 11, "name": "Pozantı" },
          { "id": 15, "name": "Saimbeyli" },
          { "id": 5, "name": "Sarıçam" },
          { "id": 2, "name": "Seyhan" },
          { "id": 13, "name": "Tufanbeyli" },
          { "id": 12, "name": "Yumurtalık" },
          { "id": 3, "name": "Yüreğir" }
        ]
      },
      {
        "id": 2,
        "name": "Adıyaman",
        "district": [
          { "id": 18, "name": "Besni" },
          { "id": 22, "name": "Çelikhan" },
          { "id": 20, "name": "Gerger" },
          { "id": 19, "name": "Gölbaşı" },
          { "id": 17, "name": "Kahta" },
          { "id": 16, "name": "Merkez" },
          { "id": 24, "name": "Samsat" },
          { "id": 21, "name": "Sincik" },
          { "id": 23, "name": "Tut" }
        ]
      },
      {
        "id": 3,
        "name": "Afyonkarahisar",
        "district": [
          { "id": 38, "name": "Başmakçı" },
          { "id": 40, "name": "Bayat" },
          { "id": 28, "name": "Bolvadin" },
          { "id": 32, "name": "Çay" },
          { "id": 36, "name": "Çobanlar" },
          { "id": 37, "name": "Dazkırı" },
          { "id": 27, "name": "Dinar" },
          { "id": 30, "name": "Emirdağ" },
          { "id": 41, "name": "Evciler" },
          { "id": 39, "name": "Hocalar" },
          { "id": 33, "name": "İhsaniye" },
          { "id": 34, "name": "İscehisar" },
          { "id": 42, "name": "Kızılören" },
          { "id": 25, "name": "Merkez" },
          { "id": 26, "name": "Sandıklı" },
          { "id": 29, "name": "Sinanpaşa" },
          { "id": 31, "name": "Şuhut" },
          { "id": 35, "name": "Sultandağı" }
        ]
      },
      {
        "id": 4,
        "name": "Ağrı",
        "district": [
          { "id": 46, "name": "Diyadin" },
          { "id": 45, "name": "Doğubeyazıt" },
          { "id": 47, "name": "Eleşkirt" },
          { "id": 50, "name": "Hamur" },
          { "id": 43, "name": "Merkez" },
          { "id": 44, "name": "Patnos" },
          { "id": 49, "name": "Taşlıçay" },
          { "id": 48, "name": "Tutak" }
        ]
      },
      {
        "id": 68,
        "name": "Aksaray",
        "district": [
          { "id": 895, "name": "Ağaçören" },
          { "id": 891, "name": "Eskil" },
          { "id": 892, "name": "Gülağaç" },
          { "id": 893, "name": "Güzelyurt" },
          { "id": 889, "name": "Merkez" },
          { "id": 890, "name": "Ortaköy" },
          { "id": 896, "name": "Sarıyahşi" },
          { "id": 894, "name": "Sultanhanı" }
        ]
      },
      {
        "id": 5,
        "name": "Amasya",
        "district": [
          { "id": 55, "name": "Göynücek" },
          { "id": 57, "name": "Gümüşhacıköy" },
          { "id": 56, "name": "Hamamözü" },
          { "id": 51, "name": "Merkez" },
          { "id": 52, "name": "Merzifon" },
          { "id": 53, "name": "Suluova" },
          { "id": 54, "name": "Taşova" }
        ]
      },
      {
        "id": 6,
        "name": "Ankara",
        "district": [
          { "id": 73, "name": "Akyurt" },
          { "id": 64, "name": "Altındağ" },
          { "id": 78, "name": "Ayaş" },
          { "id": 75, "name": "Bala" },
          { "id": 70, "name": "Beypazarı" },
          { "id": 79, "name": "Çamlıdere" },
          { "id": 58, "name": "Çankaya" },
          { "id": 68, "name": "Çubuk" },
          { "id": 72, "name": "Elmadağ" },
          { "id": 62, "name": "Etimesgut" },
          { "id": 82, "name": "Evren" },
          { "id": 66, "name": "Gölbaşı" },
          { "id": 81, "name": "Güdül" },
          { "id": 71, "name": "Haymana" },
          { "id": 69, "name": "Kahramankazan" },
          { "id": 80, "name": "Kalecik" },
          { "id": 59, "name": "Keçiören" },
          { "id": 76, "name": "Kızılcahamam" },
          { "id": 61, "name": "Mamak" },
          { "id": 77, "name": "Nallıhan" },
          { "id": 67, "name": "Polatlı" },
          { "id": 65, "name": "Pursaklar" },
          { "id": 74, "name": "Şereflikoçhisar" },
          { "id": 63, "name": "Sincan" },
          { "id": 60, "name": "Yenimahalle" }
        ]
      },
      {
        "id": 7,
        "name": "Antalya",
        "district": [
          { "id": 99, "name": "Akseki" },
          { "id": 89, "name": "Aksu" },
          { "id": 85, "name": "Alanya" },
          { "id": 98, "name": "Demre" },
          { "id": 91, "name": "Döşemealtı" },
          { "id": 97, "name": "Elmalı" },
          { "id": 95, "name": " Finike" },
          { "id": 94, "name": "Gazipaşa" },
          { "id": 100, "name": "Gündoğmuş" },
          { "id": 101, "name": "İbradi" },
          { "id": 92, "name": "Kaş" },
          { "id": 96, "name": "Kemer" },
          { "id": 83, "name": "Kepez" },
          { "id": 87, "name": "Konyaaltı" },
          { "id": 93, "name": "Korkuteli" },
          { "id": 90, "name": "Kumluca" },
          { "id": 86, "name": "Manavgat" },
          { "id": 84, "name": "Muratpaşa" },
          { "id": 88, "name": "Serik" }
        ]
      },
      {
        "id": 75,
        "name": "Ardahan",
        "district": [
          { "id": 934, "name": "Çıldır" },
          { "id": 937, "name": "Damal" },
          { "id": 933, "name": "Göle" },
          { "id": 935, "name": "Hanak" },
          { "id": 932, "name": "Merkez" },
          { "id": 936, "name": "Posof" }
        ]
      },
      {
        "id": 8,
        "name": "Artvin",
        "district": [
          { "id": 108, "name": "Aksu" },
          { "id": 110, "name": "Ardanuç" },
          { "id": 105, "name": "Arhavi" },
          { "id": 104, "name": "Borçka" },
          { "id": 103, "name": "Hopa" },
          { "id": 111, "name": "Kemalpaşa" },
          { "id": 109, "name": "Kumluca" },
          { "id": 102, "name": "Merkez" },
          { "id": 112, "name": "Murgul" },
          { "id": 107, "name": "Şavşat" },
          { "id": 106, "name": "Yusufeli" }
        ]
      },
      {
        "id": 9,
        "name": "Aydın",
        "district": [
          { "id": 121, "name": "Bozdoğan" },
          { "id": 127, "name": "Buharkent" },
          { "id": 119, "name": "Çine" },
          { "id": 117, "name": "Didim" },
          { "id": 113, "name": "Efeler" },
          { "id": 120, "name": "Germencik" },
          { "id": 118, "name": "İncirliova" },
          { "id": 126, "name": "Karacasu" },
          { "id": 129, "name": "Karpuzlu" },
          { "id": 124, "name": "Koçarlı" },
          { "id": 122, "name": "Köşk" },
          { "id": 116, "name": "Kuşadası" },
          { "id": 123, "name": "Kuyucak" },
          { "id": 114, "name": "Nazilli" },
          { "id": 115, "name": "Söke" },
          { "id": 125, "name": "Sultanhisar" },
          { "id": 128, "name": "Yenipazar" }
        ]
      },
      {
        "id": 10,
        "name": "Balıkesir",
        "district": [
          { "id": 130, "name": "Altıeylül" },
          { "id": 135, "name": "Ayvalık" },
          { "id": 148, "name": "Balya" },
          { "id": 133, "name": "Bandırma" },
          { "id": 137, "name": "Bigadiç" },
          { "id": 136, "name": "Burhaniye" },
          { "id": 139, "name": "Dursunbey" },
          { "id": 132, "name": "Edremit" },
          { "id": 141, "name": "Erdek" },
          { "id": 147, "name": "Gömeç" },
          { "id": 134, "name": "Gönen" },
          { "id": 143, "name": "Havran" },
          { "id": 142, "name": "İvrindi" },
          { "id": 131, "name": "Karesi" },
          { "id": 144, "name": "Kepsut" },
          { "id": 145, "name": "Manyas" },
          { "id": 149, "name": "Marmara" },
          { "id": 146, "name": "Savaştepe" },
          { "id": 140, "name": "Sındırgı" },
          { "id": 138, "name": "Susurluk" }
        ]
      },
      {
        "id": 74,
        "name": "Bartın",
        "district": [
          { "id": 930, "name": "Amasra" },
          { "id": 931, "name": "Kurucaşile" },
          { "id": 928, "name": "Merkez" },
          { "id": 929, "name": "Ulus" }
        ]
      },
      {
        "id": 72,
        "name": "Batman",
        "district": [
          { "id": 918, "name": "Beşiri" },
          { "id": 919, "name": "Gercüş" },
          { "id": 920, "name": "Hasankeyf" },
          { "id": 916, "name": "Kozluk" },
          { "id": 915, "name": "Merkez" },
          { "id": 917, "name": "Sason" }
        ]
      },
      {
        "id": 69,
        "name": "Bayburt",
        "district": [
          { "id": 899, "name": "Aydıntepe" },
          { "id": 898, "name": "Demirözü" },
          { "id": 897, "name": "Merkez" }
        ]
      },
      {
        "id": 11,
        "name": "Bilecik",
        "district": [
          { "id": 151, "name": "Bozüyük" },
          { "id": 154, "name": "Gölpazarı" },
          { "id": 156, "name": "İnhisar" },
          { "id": 150, "name": "Merkez" },
          { "id": 152, "name": "Osmaneli" },
          { "id": 155, "name": "Pazaryeri" },
          { "id": 153, "name": "Söğüt" },
          { "id": 157, "name": "Yenipazar" }
        ]
      },
      {
        "id": 12,
        "name": "Bingöl",
        "district": [
          { "id": 162, "name": "Adaklı" },
          { "id": 159, "name": "Genç" },
          { "id": 161, "name": "Karlıova" },
          { "id": 163, "name": "Kiğı" },
          { "id": 158, "name": "Merkez" },
          { "id": 160, "name": "Solhan" },
          { "id": 165, "name": "Yayladere" },
          { "id": 164, "name": "Yedisu" }
        ]
      },
      {
        "id": 13,
        "name": "Bitlis",
        "district": [
          { "id": 172, "name": "Adilcevaz" },
          { "id": 169, "name": "Ahlat" },
          { "id": 168, "name": "Güroymak" },
          { "id": 170, "name": "Hizan" },
          { "id": 167, "name": "Merkez" },
          { "id": 171, "name": "Mutki" },
          { "id": 166, "name": "Tatvan" }
        ]
      },
      {
        "id": 14,
        "name": "Bolu",
        "district": [
          { "id": 179, "name": "Dörtdivan" },
          { "id": 174, "name": "Gerede" },
          { "id": 176, "name": "Göynük" },
          { "id": 181, "name": "Kıbrıscık" },
          { "id": 177, "name": "Mengen" },
          { "id": 173, "name": "Merkez" },
          { "id": 175, "name": "Mudurnu" },
          { "id": 180, "name": "Seben" },
          { "id": 178, "name": "Yeniçağa" }
        ]
      },
      {
        "id": 15,
        "name": "Burdur",
        "district": [
          { "id": 188, "name": "Ağlasun" },
          { "id": 190, "name": "Altınyayla" },
          { "id": 183, "name": "Bucak" },
          { "id": 186, "name": "Çavdır" },
          { "id": 191, "name": "Çeltikçi" },
          { "id": 184, "name": "Gölhisar" },
          { "id": 189, "name": "Karamanlı" },
          { "id": 192, "name": "Kemer" },
          { "id": 182, "name": "Merkez" },
          { "id": 187, "name": "Tefenni" },
          { "id": 185, "name": "Yeşilova" }
        ]
      },
      {
        "id": 16,
        "name": "Bursa",
        "district": [
          { "id": 208, "name": "Büyükorhan" },
          { "id": 197, "name": "Gemlik" },
          { "id": 200, "name": "Gürsu" },
          { "id": 209, "name": "Harmancık" },
          { "id": 196, "name": "İnegöl" },
          { "id": 205, "name": "İznik" },
          { "id": 201, "name": "Karacabey" },
          { "id": 207, "name": "Keles" },
          { "id": 203, "name": "Kestel" },
          { "id": 199, "name": "Mudanya" },
          { "id": 198, "name": "Mustafakemalpa" },
          { "id": 195, "name": "Nilüfer" },
          { "id": 206, "name": "Orhaneli" },
          { "id": 202, "name": "Orhangazi" },
          { "id": 193, "name": "Osmangazi" },
          { "id": 204, "name": "Yenişehir" },
          { "id": 194, "name": "Yıldırım" }
        ]
      },
      {
        "id": 17,
        "name": "Çanakkale",
        "district": [
          { "id": 214, "name": "Ayvacık" },
          { "id": 217, "name": "Bayramiç" },
          { "id": 211, "name": "Biga" },
          { "id": 221, "name": "Bozcaada" },
          { "id": 212, "name": "Çan" },
          { "id": 220, "name": "Eceabat" },
          { "id": 215, "name": "Ezine" },
          { "id": 213, "name": "Gelibolu" },
          { "id": 219, "name": "Gökçeada" },
          { "id": 218, "name": "Lapseki" },
          { "id": 210, "name": "Merkez" },
          { "id": 216, "name": "Yenice" }
        ]
      },
      {
        "id": 18,
        "name": "Çankırı",
        "district": [
          { "id": 231, "name": "Atkaracalar" },
          { "id": 233, "name": "Bayramören" },
          { "id": 224, "name": "Çerkeş" },
          { "id": 230, "name": "Eldivan" },
          { "id": 225, "name": "Ilgaz" },
          { "id": 229, "name": "Kızılırmak" },
          { "id": 232, "name": "Korgun" },
          { "id": 227, "name": "Kurşunlu" },
          { "id": 222, "name": "Merkez" },
          { "id": 223, "name": "Orta" },
          { "id": 226, "name": "Şabanözü" },
          { "id": 228, "name": "Yapraklı" }
        ]
      },
      {
        "id": 19,
        "name": "Çorum",
        "district": [
          { "id": 238, "name": "Alaca" },
          { "id": 239, "name": "Bayat" },
          { "id": 247, "name": "Boğazkale" },
          { "id": 244, "name": "Dodurga" },
          { "id": 237, "name": "İskilip" },
          { "id": 240, "name": "Kargı" },
          { "id": 246, "name": "Laçin" },
          { "id": 241, "name": "Mecitözü" },
          { "id": 234, "name": "Merkez" },
          { "id": 245, "name": "Oğuzlar" },
          { "id": 242, "name": "Ortaköy" },
          { "id": 236, "name": "Osmancık" },
          { "id": 235, "name": "Sungurlu" },
          { "id": 243, "name": "Uğurludağ" }
        ]
      },
      {
        "id": 20,
        "name": "Denizli",
        "district": [
          { "id": 251, "name": "Acıpayam" },
          { "id": 265, "name": "Babadağ" },
          { "id": 266, "name": "Baklan" },
          { "id": 263, "name": "Bekilli" },
          { "id": 264, "name": "Beyağaç" },
          { "id": 260, "name": "Bozkurt" },
          { "id": 255, "name": "Buldan" },
          { "id": 257, "name": "Çal" },
          { "id": 258, "name": "Çameli" },
          { "id": 262, "name": "Çardak" },
          { "id": 250, "name": "Çivril" },
          { "id": 261, "name": "Güney" },
          { "id": 253, "name": "Honaz" },
          { "id": 256, "name": "Kale" },
          { "id": 249, "name": "Merkezefendi" },
          { "id": 248, "name": "Pamukkale" },
          { "id": 254, "name": "Sarayköy" },
          { "id": 259, "name": "Serinhisar" },
          { "id": 252, "name": "Tavas" }
        ]
      },
      {
        "id": 21,
        "name": "Diyarbakır",
        "district": [
          { "id": 267, "name": "Bağlar" },
          { "id": 271, "name": "Bismil" },
          { "id": 275, "name": "Çermik" },
          { "id": 274, "name": "Çınar" },
          { "id": 283, "name": "Çüngüş" },
          { "id": 276, "name": "Dicle" },
          { "id": 280, "name": "Eğil" },
          { "id": 270, "name": "Ergani" },
          { "id": 278, "name": "Hani" },
          { "id": 281, "name": "Hazro" },
          { "id": 268, "name": "Kayapınar" },
          { "id": 282, "name": "Kocaköy" },
          { "id": 277, "name": "Kulp" },
          { "id": 279, "name": "Lice" },
          { "id": 273, "name": "Silvan" },
          { "id": 272, "name": "Sur" },
          { "id": 269, "name": "Yenişehir" }
        ]
      },
      {
        "id": 81,
        "name": "Düzce",
        "district": [
          { "id": 966, "name": "Akçakoca" },
          { "id": 969, "name": "Çilimli" },
          { "id": 972, "name": "Cumayeri" },
          { "id": 968, "name": "Gölyaka" },
          { "id": 971, "name": "Gümüşova" },
          { "id": 967, "name": "Kaynaşlı" },
          { "id": 965, "name": "Merkez" },
          { "id": 970, "name": "Yığılca" }
        ]
      },
      {
        "id": 22,
        "name": "Edirne",
        "district": [
          { "id": 290, "name": "Enez" },
          { "id": 288, "name": "Havsa" },
          { "id": 287, "name": "İpsala" },
          { "id": 285, "name": "Keşan" },
          { "id": 292, "name": "Lalapaşa" },
          { "id": 289, "name": "Meriç" },
          { "id": 284, "name": "Merkez" },
          { "id": 291, "name": "Süloğlu" },
          { "id": 286, "name": "Uzunköprü" }
        ]
      },
      {
        "id": 23,
        "name": "Elazığ",
        "district": [
          { "id": 303, "name": "Ağın" },
          { "id": 302, "name": "Alacakaya" },
          { "id": 298, "name": "Arıcak" },
          { "id": 297, "name": "Baskil" },
          { "id": 295, "name": "Karakoçan" },
          { "id": 301, "name": "Keban" },
          { "id": 294, "name": "Kovancılar" },
          { "id": 299, "name": "Maden" },
          { "id": 293, "name": "Merkez" },
          { "id": 296, "name": "Palu" },
          { "id": 300, "name": "Sivrice" }
        ]
      },
      {
        "id": 24,
        "name": "Erzincan",
        "district": [
          { "id": 308, "name": "Çayırlı" },
          { "id": 309, "name": "İliç" },
          { "id": 310, "name": "Kemah" },
          { "id": 311, "name": "Kemaliye" },
          { "id": 304, "name": "Merkez" },
          { "id": 312, "name": "Otlukbeli" },
          { "id": 307, "name": "Refahiye" },
          { "id": 305, "name": "Tercan" },
          { "id": 306, "name": "Üzümlü" }
        ]
      },
      {
        "id": 25,
        "name": "Erzurum",
        "district": [
          { "id": 322, "name": "Aşkale" },
          { "id": 315, "name": "Aziziye" },
          { "id": 325, "name": "Çat" },
          { "id": 320, "name": "Hınıs" },
          { "id": 316, "name": "Horasan" },
          { "id": 328, "name": "İspir" },
          { "id": 323, "name": "Karaçoban" },
          { "id": 319, "name": "Karayazı" },
          { "id": 327, "name": "Köprüköy" },
          { "id": 329, "name": "Narman" },
          { "id": 317, "name": "Oltu" },
          { "id": 331, "name": "Olur" },
          { "id": 314, "name": "Palandöken" },
          { "id": 318, "name": "Pasinler" },
          { "id": 332, "name": "Pazaryolu" },
          { "id": 324, "name": "Şenkaya" },
          { "id": 321, "name": "Tekman" },
          { "id": 326, "name": "Tortum" },
          { "id": 330, "name": "Uzundere" },
          { "id": 313, "name": "Yakutiye" }
        ]
      },
      {
        "id": 26,
        "name": "Eskişehir",
        "district": [
          { "id": 338, "name": "Alpu" },
          { "id": 341, "name": "Beylikova" },
          { "id": 336, "name": "Çifteler" },
          { "id": 343, "name": "Günyüzü" },
          { "id": 346, "name": "Han" },
          { "id": 342, "name": "İnönü" },
          { "id": 340, "name": "Mahmudiye" },
          { "id": 345, "name": "Mihalgazi" },
          { "id": 339, "name": "Mihalıççık" },
          { "id": 333, "name": "Odunpazarı" },
          { "id": 344, "name": "Sarıcakaya" },
          { "id": 337, "name": "Seyitgazi" },
          { "id": 335, "name": "Sivrihisar" },
          { "id": 334, "name": "Tepebaşı" }
        ]
      },
      {
        "id": 27,
        "name": "Gaziantep",
        "district": [
          { "id": 352, "name": "Araban" },
          { "id": 350, "name": "İslahiye" },
          { "id": 355, "name": "Karkamış" },
          { "id": 349, "name": "Nizip" },
          { "id": 351, "name": "Nurdağı" },
          { "id": 353, "name": "Oğuzeli" },
          { "id": 347, "name": "Şahinbey" },
          { "id": 348, "name": "Şehitkamil" },
          { "id": 354, "name": "Yavuzeli" }
        ]
      },
      {
        "id": 28,
        "name": "Giresun",
        "district": [
          { "id": 367, "name": "Alucra" },
          { "id": 357, "name": "Bulancak" },
          { "id": 368, "name": "Çamoluk" },
          { "id": 371, "name": "Çanakçı" },
          { "id": 363, "name": "Dereli" },
          { "id": 370, "name": "Doğankent" },
          { "id": 358, "name": "Espiye" },
          { "id": 366, "name": "Eynesil" },
          { "id": 359, "name": "Görele" },
          { "id": 369, "name": "Güce" },
          { "id": 362, "name": "Keşap" },
          { "id": 356, "name": "Merkez" },
          { "id": 365, "name": "Piraziz" },
          { "id": 361, "name": "Şebinkarahisar" },
          { "id": 360, "name": "Tirebolu" },
          { "id": 364, "name": "Yağlıdere" }
        ]
      },
      {
        "id": 29,
        "name": "Gümüşhane",
        "district": [
          { "id": 373, "name": "Kelkit" },
          { "id": 377, "name": "Köse" },
          { "id": 375, "name": "Kürtün" },
          { "id": 372, "name": "Merkez" },
          { "id": 374, "name": "Şiran" },
          { "id": 376, "name": "Torul" }
        ]
      },
      {
        "id": 30,
        "name": "Hakkari",
        "district": [
          { "id": 382, "name": "Çukurca" },
          { "id": 381, "name": "Derecik" },
          { "id": 379, "name": "Merkez" },
          { "id": 380, "name": "Şemdinli" },
          { "id": 378, "name": "Yüksekova" }
        ]
      },
      {
        "id": 31,
        "name": "Hatay",
        "district": [
          { "id": 391, "name": "Altınözü" },
          { "id": 383, "name": "Antakya" },
          { "id": 390, "name": "Arsuz" },
          { "id": 396, "name": "Belen" },
          { "id": 385, "name": "Defne" },
          { "id": 386, "name": "Dörtyol" },
          { "id": 394, "name": "Erzin" },
          { "id": 392, "name": "Hassa" },
          { "id": 384, "name": "İskenderun" },
          { "id": 388, "name": "Kırıkhan" },
          { "id": 397, "name": "Kumlu" },
          { "id": 393, "name": "Payas" },
          { "id": 389, "name": "Reyhanlı" },
          { "id": 387, "name": "Samandağ" },
          { "id": 395, "name": "Yayladağı" }
        ]
      },
      {
        "id": 76,
        "name": "Iğdır",
        "district": [
          { "id": 940, "name": "Aralık" },
          { "id": 941, "name": "Karakoyunlu" },
          { "id": 938, "name": "Merkez" },
          { "id": 939, "name": "Tuzluca" }
        ]
      },
      {
        "id": 32,
        "name": "Isparta",
        "district": [
          { "id": 409, "name": "Aksu" },
          { "id": 408, "name": "Atabey" },
          { "id": 400, "name": "Eğirdir" },
          { "id": 402, "name": "Gelendost" },
          { "id": 406, "name": "Gönen" },
          { "id": 403, "name": "Keçiborlu" },
          { "id": 398, "name": "Merkez" },
          { "id": 401, "name": "Şarkikaraağaç" },
          { "id": 404, "name": "Senirkent" },
          { "id": 405, "name": "Sütçüler" },
          { "id": 407, "name": "Uluborlu" },
          { "id": 399, "name": "Yalvaç" },
          { "id": 410, "name": "Yenişarbademli" }
        ]
      },
      {
        "id": 34,
        "name": "İstanbul",
        "district": [
          { "id": 462, "name": "Adalar" },
          { "id": 451, "name": "Arnavutköy" },
          { "id": 441, "name": "Ataşehir" },
          { "id": 439, "name": "Avcılar" },
          { "id": 426, "name": "Bağcılar" },
          { "id": 429, "name": "Bahçelievler" },
          { "id": 457, "name": "Bakırköy" },
          { "id": 440, "name": "Başakşehir" },
          { "id": 450, "name": "Bayrampaşa" },
          { "id": 459, "name": "Beşiktaş" },
          { "id": 455, "name": "Beykoz" },
          { "id": 445, "name": "Beylikdüzü" },
          { "id": 456, "name": "Beyoğlu" },
          { "id": 454, "name": "Büyükçekmece" },
          { "id": 460, "name": "Çatalca" },
          { "id": 453, "name": "Çekmeköy" },
          { "id": 436, "name": "Esenler" },
          { "id": 424, "name": "Esenyurt" },
          { "id": 443, "name": "Eyüp" },
          { "id": 438, "name": "Fatih" },
          { "id": 433, "name": "Gaziosmanpaşa" },
          { "id": 447, "name": "Güngören" },
          { "id": 435, "name": "Kadıköy" },
          { "id": 437, "name": "Kağıthane" },
          { "id": 434, "name": "Kartal" },
          { "id": 425, "name": "Küçükçekmece" },
          { "id": 432, "name": "Maltepe" },
          { "id": 427, "name": "Pendik" },
          { "id": 442, "name": "Sancaktepe" },
          { "id": 444, "name": "Sarıyer" },
          { "id": 461, "name": "Şile" },
          { "id": 458, "name": "Silivri" },
          { "id": 449, "name": "Şişli" },
          { "id": 446, "name": "Sultanbeyli" },
          { "id": 431, "name": "Sultangazi" },
          { "id": 452, "name": "Tuzla" },
          { "id": 428, "name": "Ümraniye" },
          { "id": 430, "name": "Üsküdar" },
          { "id": 448, "name": "Zeytinburnu" }
        ]
      },
      {
        "id": 35,
        "name": "İzmir",
        "district": [
          { "id": 476, "name": "Aliağa" },
          { "id": 479, "name": "Balçova" },
          { "id": 486, "name": "Bayındır" },
          { "id": 468, "name": "Bayraklı" },
          { "id": 475, "name": "Bergama" },
          { "id": 491, "name": "Beydağ" },
          { "id": 465, "name": "Bornova" },
          { "id": 463, "name": "Buca" },
          { "id": 485, "name": "Çeşme" },
          { "id": 469, "name": "Çiğli" },
          { "id": 482, "name": "Dikili" },
          { "id": 488, "name": "Foça" },
          { "id": 472, "name": "Gaziemir" },
          { "id": 489, "name": "Güzelbahçe" },
          { "id": 464, "name": "Karabağlar" },
          { "id": 492, "name": "Karaburun" },
          { "id": 467, "name": "Karşıyaka" },
          { "id": 474, "name": "Kemalpaşa" },
          { "id": 483, "name": "Kiraz" },
          { "id": 490, "name": "Kınık" },
          { "id": 466, "name": "Konak" },
          { "id": 477, "name": "Menderes" },
          { "id": 471, "name": "Menemen" },
          { "id": 481, "name": "Narlıdere" },
          { "id": 473, "name": "Ödemiş" },
          { "id": 484, "name": "Seferihisar" },
          { "id": 487, "name": "Selçuk" },
          { "id": 478, "name": "Tire" },
          { "id": 470, "name": "Torbalı" },
          { "id": 480, "name": "Urla" }
        ]
      },
      {
        "id": 46,
        "name": "Kahramanmaraş",
        "district": [
          { "id": 639, "name": "Afşin" },
          { "id": 643, "name": "Andırın" },
          { "id": 644, "name": "Çağlayancerit" },
          { "id": 637, "name": "Dulkadiroğlu" },
          { "id": 646, "name": "Ekinözü" },
          { "id": 638, "name": "Elbistan" },
          { "id": 642, "name": "Göksun" },
          { "id": 645, "name": "Nurhak" },
          { "id": 636, "name": "Onikişubat" },
          { "id": 641, "name": "Pazarcık" },
          { "id": 640, "name": "Türkoğlu" }
        ]
      },
      {
        "id": 78,
        "name": "Karabük",
        "district": [
          { "id": 952, "name": "Eflani" },
          { "id": 951, "name": "Eskipazar" },
          { "id": 948, "name": "Merkez" },
          { "id": 953, "name": "Ovacık" },
          { "id": 949, "name": "Safranbolu" },
          { "id": 950, "name": "Yenice" }
        ]
      },
      {
        "id": 70,
        "name": "Karaman",
        "district": [
          { "id": 903, "name": "Ayrancı" },
          { "id": 905, "name": "Başyayla" },
          { "id": 901, "name": "Ermenek" },
          { "id": 904, "name": "Kazımkarabekir" },
          { "id": 900, "name": "Merkez" },
          { "id": 902, "name": "Sarıveliler" }
        ]
      },
      {
        "id": 36,
        "name": "Kars",
        "district": [
          { "id": 499, "name": "Akyaka" },
          { "id": 498, "name": "Arpaçay" },
          { "id": 497, "name": "Digor" },
          { "id": 494, "name": "Kağızman" },
          { "id": 493, "name": "Merkez" },
          { "id": 495, "name": "Sarıkamış" },
          { "id": 496, "name": "Selim" },
          { "id": 500, "name": "Susuz" }
        ]
      },
      {
        "id": 37,
        "name": "Kastamonu",
        "district": [
          { "id": 516, "name": "Abana" },
          { "id": 519, "name": "Ağlı" },
          { "id": 506, "name": "Araç" },
          { "id": 509, "name": "Azdavay" },
          { "id": 507, "name": "Bozkurt" },
          { "id": 510, "name": "Çatalzeytin" },
          { "id": 504, "name": "Cide" },
          { "id": 508, "name": "Daday" },
          { "id": 511, "name": "Doğanyurt" },
          { "id": 517, "name": "Hanönü" },
          { "id": 514, "name": "İhsangazi" },
          { "id": 505, "name": "İnebolu" },
          { "id": 512, "name": "Küre" },
          { "id": 501, "name": "Merkez" },
          { "id": 513, "name": "Pınarbaşı" },
          { "id": 515, "name": "Şenpazar" },
          { "id": 518, "name": "Seydiler" },
          { "id": 503, "name": "Taşköprü" },
          { "id": 502, "name": "Tosya" }
        ]
      },
      {
        "id": 38,
        "name": "Kayseri",
        "district": [
          { "id": 533, "name": "Akkışla" },
          { "id": 525, "name": "Bünyan" },
          { "id": 523, "name": "Develi" },
          { "id": 532, "name": "Felahiye" },
          { "id": 530, "name": "Hacılar" },
          { "id": 521, "name": "Kocasinan" },
          { "id": 520, "name": "Melikgazi" },
          { "id": 534, "name": "Özvatan" },
          { "id": 526, "name": "Pınarbaşı" },
          { "id": 529, "name": "Sarıoğlan" },
          { "id": 531, "name": "Sarız" },
          { "id": 522, "name": "Talas" },
          { "id": 527, "name": "Tomarza" },
          { "id": 524, "name": "Yahyalı" },
          { "id": 528, "name": "Yeşilhisar" }
        ]
      },
      {
        "id": 79,
        "name": "Kilis",
        "district": [
          { "id": 956, "name": "Elbeyli" },
          { "id": 954, "name": "Merkez" },
          { "id": 955, "name": "Musabeyli" },
          { "id": 957, "name": "Polateli" }
        ]
      },
      {
        "id": 71,
        "name": "Kırıkkale",
        "district": [
          { "id": 911, "name": "Bahşili" },
          { "id": 912, "name": "Balışeyh" },
          { "id": 914, "name": "Çelebi" },
          { "id": 909, "name": "Delice" },
          { "id": 913, "name": "Karakeçili" },
          { "id": 908, "name": "Keskin" },
          { "id": 906, "name": "Merkez" },
          { "id": 910, "name": "Sulakyurt" },
          { "id": 907, "name": "Yahşihan" }
        ]
      },
      {
        "id": 39,
        "name": "Kırklareli",
        "district": [
          { "id": 537, "name": "Babaeski" },
          { "id": 540, "name": "Demirköy" },
          { "id": 542, "name": "Kofçaz" },
          { "id": 535, "name": "Lüleburgaz" },
          { "id": 536, "name": "Merkez" },
          { "id": 541, "name": "Pehlivanköy" },
          { "id": 539, "name": "Pınarhisar" },
          { "id": 538, "name": "Vize" }
        ]
      },
      {
        "id": 40,
        "name": "Kırşehir",
        "district": [
          { "id": 549, "name": "Akçakent" },
          { "id": 547, "name": "Akpınar" },
          { "id": 548, "name": "Boztepe" },
          { "id": 546, "name": "Çiçekdağı" },
          { "id": 544, "name": "Kaman" },
          { "id": 543, "name": "Merkez" },
          { "id": 545, "name": "Mucur" }
        ]
      },
      {
        "id": 41,
        "name": "Kocaeli",
        "district": [
          { "id": 558, "name": "Başiskele" },
          { "id": 556, "name": "Çayırova" },
          { "id": 552, "name": "Darıca" },
          { "id": 555, "name": "Derince" },
          { "id": 561, "name": "Dilovası" },
          { "id": 550, "name": "Gebze" },
          { "id": 554, "name": "Gölcük" },
          { "id": 551, "name": "İzmit" },
          { "id": 560, "name": "Kandıra" },
          { "id": 559, "name": "Karamürsel" },
          { "id": 557, "name": "Kartepe" },
          { "id": 553, "name": "Körfez" }
        ]
      },
      {
        "id": 42,
        "name": "Konya",
        "district": [
          { "id": 589, "name": "Ahırlı" },
          { "id": 588, "name": "Akören" },
          { "id": 566, "name": "Akşehir" },
          { "id": 580, "name": "Altınekin" },
          { "id": 567, "name": "Beyşehir" },
          { "id": 576, "name": "Bozkır" },
          { "id": 582, "name": "Çeltik" },
          { "id": 571, "name": "Cihanbeyli" },
          { "id": 568, "name": "Çumra" },
          { "id": 590, "name": "Derbent" },
          { "id": 587, "name": "Derebucak" },
          { "id": 579, "name": "Doğanhisar" },
          { "id": 584, "name": "Emirgazi" },
          { "id": 565, "name": "Ereğli" },
          { "id": 583, "name": "Güneysınır" },
          { "id": 581, "name": "Hadim" },
          { "id": 591, "name": "Halkapınar" },
          { "id": 578, "name": "Hüyük" },
          { "id": 570, "name": "Ilgın" },
          { "id": 574, "name": "Kadınhanı" },
          { "id": 573, "name": "Karapınar" },
          { "id": 564, "name": "Karatay" },
          { "id": 572, "name": "Kulu" },
          { "id": 563, "name": "Meram" },
          { "id": 575, "name": "Sarayönü" },
          { "id": 562, "name": "Selçuklu" },
          { "id": 569, "name": "Seydişehir" },
          { "id": 585, "name": "Taşkent" },
          { "id": 586, "name": "Tuzlukçu" },
          { "id": 592, "name": "Yalıhüyük" },
          { "id": 577, "name": "Yunak" }
        ]
      },
      {
        "id": 43,
        "name": "Kütahya",
        "district": [
          { "id": 598, "name": "Altıntaş" },
          { "id": 601, "name": "Aslanapa" },
          { "id": 602, "name": "Çavdarhisar" },
          { "id": 599, "name": "Domaniç" },
          { "id": 605, "name": "Dumlupınar" },
          { "id": 597, "name": "Emet" },
          { "id": 596, "name": "Gediz" },
          { "id": 600, "name": "Hisarcık" },
          { "id": 593, "name": "Merkez" },
          { "id": 604, "name": "Pazarlar" },
          { "id": 603, "name": "Şaphane" },
          { "id": 595, "name": "Simav" },
          { "id": 594, "name": "Tavşanlı" }
        ]
      },
      {
        "id": 44,
        "name": "Malatya",
        "district": [
          { "id": 609, "name": "Akçadağ" },
          { "id": 614, "name": "Arapgir" },
          { "id": 616, "name": "Arguvan" },
          { "id": 607, "name": "Battalgazi" },
          { "id": 610, "name": "Darende" },
          { "id": 608, "name": "Doğanşehir" },
          { "id": 618, "name": "Doğanyol" },
          { "id": 611, "name": "Hekimhan" },
          { "id": 617, "name": "Kale" },
          { "id": 615, "name": "Kuluncak" },
          { "id": 613, "name": "Pütürge" },
          { "id": 612, "name": "Yazıhan" },
          { "id": 606, "name": "Yeşilyurt" }
        ]
      },
      {
        "id": 45,
        "name": "Manisa",
        "district": [
          { "id": 633, "name": "Ahmetli" },
          { "id": 620, "name": "Akhisar" },
          { "id": 625, "name": "Alaşehir" },
          { "id": 628, "name": "Demirci" },
          { "id": 634, "name": "Gölmarmara" },
          { "id": 631, "name": "Gördes" },
          { "id": 629, "name": "Kırıkağaç" },
          { "id": 635, "name": "Köprübaşı" },
          { "id": 627, "name": "Kula" },
          { "id": 623, "name": "Salihli" },
          { "id": 630, "name": "Sarıgöl" },
          { "id": 626, "name": "Saruhanlı" },
          { "id": 621, "name": "Şehzadeler" },
          { "id": 632, "name": "Selendi" },
          { "id": 624, "name": "Soma" },
          { "id": 622, "name": "Turgutlu" },
          { "id": 619, "name": "Yunusemre" }
        ]
      },
      {
        "id": 47,
        "name": "Mardin",
        "district": [
          { "id": 648, "name": "Artuklu" },
          { "id": 653, "name": "Dargeçit" },
          { "id": 651, "name": "Derik" },
          { "id": 647, "name": "Kızıltepe" },
          { "id": 652, "name": "Mazıdağı" },
          { "id": 649, "name": "Midyat" },
          { "id": 650, "name": "Nusaybin" },
          { "id": 656, "name": "Ömerli" },
          { "id": 654, "name": "Savur" },
          { "id": 655, "name": "Yeşilli" }
        ]
      },
      {
        "id": 33,
        "name": "Mersin",
        "district": [
          { "id": 413, "name": "Akdeniz" },
          { "id": 418, "name": "Anamur" },
          { "id": 422, "name": "Aydıncık" },
          { "id": 420, "name": "Bozyazı" },
          { "id": 423, "name": "Çamlıyayla" },
          { "id": 416, "name": "Erdemli" },
          { "id": 421, "name": "Gülnar" },
          { "id": 415, "name": "Mezitli" },
          { "id": 419, "name": "Mut" },
          { "id": 417, "name": "Silifke" },
          { "id": 411, "name": "Tarsus" },
          { "id": 412, "name": "Toroslar" },
          { "id": 414, "name": "Yenişehir" }
        ]
      },
      {
        "id": 48,
        "name": "Muğla",
        "district": [
          { "id": 657, "name": "Bodrum" },
          { "id": 665, "name": "Dalaman" },
          { "id": 668, "name": "Datça" },
          { "id": 658, "name": "Fethiye" },
          { "id": 669, "name": "Kavaklıdere" },
          { "id": 666, "name": "Köyceğiz" },
          { "id": 661, "name": "Marmaris" },
          { "id": 660, "name": "Menteşe" },
          { "id": 659, "name": "Milas" },
          { "id": 663, "name": "Ortaca" },
          { "id": 662, "name": "Seydikemer" },
          { "id": 667, "name": "Ula" },
          { "id": 664, "name": "Yatağan" }
        ]
      },
      {
        "id": 49,
        "name": "Muş",
        "district": [
          { "id": 671, "name": "Bulanık" },
          { "id": 675, "name": "Hasköy" },
          { "id": 674, "name": "Korkut" },
          { "id": 672, "name": "Malazgirt" },
          { "id": 670, "name": "Merkez" },
          { "id": 673, "name": "Varto" }
        ]
      },
      {
        "id": 50,
        "name": "Nevşehir",
        "district": [
          { "id": 681, "name": "Acıgöl" },
          { "id": 678, "name": "Avanos" },
          { "id": 680, "name": "Derinkuyu" },
          { "id": 679, "name": "Gülşehir" },
          { "id": 683, "name": "Hacıbektaş" },
          { "id": 682, "name": "Kozaklı" },
          { "id": 676, "name": "Merkez" },
          { "id": 677, "name": "Ürgüp" }
        ]
      },
      {
        "id": 51,
        "name": "Niğde",
        "district": [
          { "id": 688, "name": "Altunhisar" },
          { "id": 685, "name": "Bor" },
          { "id": 689, "name": "Çamardı" },
          { "id": 686, "name": "Çiftlik" },
          { "id": 684, "name": "Merkez" },
          { "id": 687, "name": "Ulukışla" }
        ]
      },
      {
        "id": 52,
        "name": "Ordu",
        "district": [
          { "id": 699, "name": "Akkuş" },
          { "id": 690, "name": "Altınordu" },
          { "id": 700, "name": "Aybastı" },
          { "id": 705, "name": "Çamaş" },
          { "id": 703, "name": "Çatalpınar" },
          { "id": 704, "name": "Çaybaşı" },
          { "id": 692, "name": "Fatsa" },
          { "id": 696, "name": "Gölköy" },
          { "id": 708, "name": "Gülyalı" },
          { "id": 701, "name": "Gürgentepe" },
          { "id": 702, "name": "İkizce" },
          { "id": 707, "name": "Kabadüz" },
          { "id": 706, "name": "Kabataş" },
          { "id": 695, "name": "Korgan" },
          { "id": 694, "name": "Kumru" },
          { "id": 698, "name": "Mesudiye" },
          { "id": 693, "name": "Perşembe" },
          { "id": 697, "name": "Ulubey" },
          { "id": 691, "name": "Ünye" }
        ]
      },
      {
        "id": 80,
        "name": "Osmaniye",
        "district": [
          { "id": 961, "name": "Bahçe" },
          { "id": 960, "name": "Düziçi" },
          { "id": 964, "name": "Hasanbeyli" },
          { "id": 959, "name": "Kadirli" },
          { "id": 958, "name": "Merkez" },
          { "id": 963, "name": "Sumbas" },
          { "id": 962, "name": "Toprakkale" }
        ]
      },
      {
        "id": 53,
        "name": "Rize",
        "district": [
          { "id": 711, "name": "Ardeşen" },
          { "id": 719, "name": "Çamlıhemşin" },
          { "id": 710, "name": "Çayeli" },
          { "id": 718, "name": "Derepazarı" },
          { "id": 713, "name": "Fındıklı" },
          { "id": 715, "name": "Güneysu" },
          { "id": 720, "name": "Hemşin" },
          { "id": 717, "name": "İkizdere" },
          { "id": 716, "name": "İyidere" },
          { "id": 714, "name": "Kalkandere" },
          { "id": 709, "name": "Merkez" },
          { "id": 712, "name": "Pazar" }
        ]
      },
      {
        "id": 54,
        "name": "Sakarya",
        "district": [
          { "id": 721, "name": "Adapazarı" },
          { "id": 723, "name": "Akyazı" },
          { "id": 728, "name": "Arifiye" },
          { "id": 724, "name": "Erenler" },
          { "id": 731, "name": "Ferizli" },
          { "id": 727, "name": "Geyve" },
          { "id": 725, "name": "Hendek" },
          { "id": 735, "name": "Karapürçek" },
          { "id": 726, "name": "Karasu" },
          { "id": 733, "name": "Kaynarca" },
          { "id": 732, "name": "Kocaali" },
          { "id": 730, "name": "Pamukova" },
          { "id": 729, "name": "Sapanca" },
          { "id": 722, "name": "Serdivan" },
          { "id": 734, "name": "Söğütlü" },
          { "id": 736, "name": "Taraklı" }
        ]
      },
      {
        "id": 55,
        "name": "Samsun",
        "district": [
          { "id": 746, "name": "19 Mayıs" },
          { "id": 747, "name": "Alaçam" },
          { "id": 751, "name": "Asarcık" },
          { "id": 738, "name": "Atakum" },
          { "id": 749, "name": "Ayvacık" },
          { "id": 739, "name": "Bafra" },
          { "id": 741, "name": "Canik" },
          { "id": 740, "name": "Çarşamba" },
          { "id": 745, "name": "Havza" },
          { "id": 737, "name": "İlkadım" },
          { "id": 750, "name": "Kavak" },
          { "id": 752, "name": "Ladik" },
          { "id": 748, "name": "Salıpazarı" },
          { "id": 744, "name": "Tekkeköy" },
          { "id": 743, "name": "Terme" },
          { "id": 742, "name": "Vezirköprü" },
          { "id": 753, "name": "Yakakent" }
        ]
      },
      {
        "id": 63,
        "name": "Şanlıurfa",
        "district": [
          { "id": 841, "name": "Akçakale" },
          { "id": 843, "name": "Birecik" },
          { "id": 846, "name": "Bozova" },
          { "id": 845, "name": "Ceylanpınar" },
          { "id": 836, "name": "Eyyübiye" },
          { "id": 837, "name": "Haliliye" },
          { "id": 844, "name": "Harran" },
          { "id": 847, "name": "Hilvan" },
          { "id": 840, "name": "Karaköprü" },
          { "id": 838, "name": "Siverek" },
          { "id": 842, "name": "Suruç" },
          { "id": 839, "name": "Viranşehir" }
        ]
      },
      {
        "id": 56,
        "name": "Siirt",
        "district": [
          { "id": 757, "name": "Baykan" },
          { "id": 759, "name": "Eruh" },
          { "id": 755, "name": "Kurtalan" },
          { "id": 754, "name": "Merkez" },
          { "id": 756, "name": "Pervari" },
          { "id": 758, "name": "Şirvan" },
          { "id": 760, "name": "Tillo" }
        ]
      },
      {
        "id": 57,
        "name": "Sinop",
        "district": [
          { "id": 764, "name": "Ayancık" },
          { "id": 762, "name": "Boyabat" },
          { "id": 769, "name": "Dikmen" },
          { "id": 765, "name": "Durağan" },
          { "id": 767, "name": "Erfelek" },
          { "id": 763, "name": "Gerze" },
          { "id": 761, "name": "Merkez" },
          { "id": 768, "name": "Saraydüzü" },
          { "id": 766, "name": "Türkeli" }
        ]
      },
      {
        "id": 58,
        "name": "Sivas",
        "district": [
          { "id": 784, "name": "Akıncılar" },
          { "id": 782, "name": "Altınyayla" },
          { "id": 778, "name": "Divriği" },
          { "id": 786, "name": "Doğanşar" },
          { "id": 774, "name": "Gemerek" },
          { "id": 785, "name": "Gölova" },
          { "id": 777, "name": "Gürün" },
          { "id": 780, "name": "Hafik" },
          { "id": 783, "name": "İmranlı" },
          { "id": 776, "name": "Kangal" },
          { "id": 779, "name": "Koyulhisar" },
          { "id": 770, "name": "Merkez" },
          { "id": 771, "name": "Şarkışla" },
          { "id": 773, "name": "Suşehri" },
          { "id": 781, "name": "Ulaş" },
          { "id": 772, "name": "Yıldızeli" },
          { "id": 775, "name": "Zara" }
        ]
      },
      {
        "id": 73,
        "name": "Şırnak",
        "district": [
          { "id": 926, "name": "Beytüşşebap" },
          { "id": 921, "name": "Cizre" },
          { "id": 927, "name": "Güçlükonak" },
          { "id": 924, "name": "İdil" },
          { "id": 923, "name": "Merkez" },
          { "id": 922, "name": "Silopi" },
          { "id": 925, "name": "Uludere" }
        ]
      },
      {
        "id": 59,
        "name": "Tekirdağ",
        "district": [
          { "id": 789, "name": "Çerkezköy" },
          { "id": 787, "name": "Çorlu" },
          { "id": 791, "name": "Ergene" },
          { "id": 795, "name": "Hayrabolu" },
          { "id": 790, "name": "Kapaklı" },
          { "id": 792, "name": "Malkara" },
          { "id": 797, "name": "Marmaraereğlisi" },
          { "id": 796, "name": "Muratlı" },
          { "id": 793, "name": "Saray" },
          { "id": 794, "name": "Şarköy" },
          { "id": 788, "name": "Süleymanpaşa" }
        ]
      },
      {
        "id": 60,
        "name": "Tokat",
        "district": [
          { "id": 804, "name": "Almus" },
          { "id": 807, "name": "Artova" },
          { "id": 809, "name": "Başçiftlik" },
          { "id": 799, "name": "Erbaa" },
          { "id": 798, "name": "Merkez" },
          { "id": 801, "name": "Niksar" },
          { "id": 805, "name": "Pazar" },
          { "id": 803, "name": "Reşadiye" },
          { "id": 808, "name": "Sulusaray" },
          { "id": 800, "name": "Turhal" },
          { "id": 806, "name": "Yeşilyurt" },
          { "id": 802, "name": "Zile" }
        ]
      },
      {
        "id": 61,
        "name": "Trabzon",
        "district": [
          { "id": 811, "name": "Akçaabat" },
          { "id": 812, "name": "Araklı" },
          { "id": 815, "name": "Arsin" },
          { "id": 819, "name": "Beşikdüzü" },
          { "id": 820, "name": "Çarşıbaşı" },
          { "id": 821, "name": "Çaykara" },
          { "id": 827, "name": "Dernekpazarı" },
          { "id": 823, "name": "Düzköy" },
          { "id": 825, "name": "Hayrat" },
          { "id": 826, "name": "Köprübaşı" },
          { "id": 818, "name": "Maçka" },
          { "id": 813, "name": "Of" },
          { "id": 810, "name": "Ortahisar" },
          { "id": 824, "name": "Şalpazarı" },
          { "id": 817, "name": "Sürmene" },
          { "id": 822, "name": "Tonya" },
          { "id": 816, "name": "Vakfıkebir" },
          { "id": 814, "name": "Yomra" }
        ]
      },
      {
        "id": 62,
        "name": "Tunceli",
        "district": [
          { "id": 831, "name": "Çemişgezek" },
          { "id": 833, "name": "Hozat" },
          { "id": 830, "name": "Mazgirt" },
          { "id": 828, "name": "Merkez" },
          { "id": 835, "name": "Nazımiye" },
          { "id": 832, "name": "Ovacık" },
          { "id": 829, "name": "Pertek" },
          { "id": 834, "name": "Pülümür" }
        ]
      },
      {
        "id": 64,
        "name": "Uşak",
        "district": [
          { "id": 849, "name": "Banaz" },
          { "id": 850, "name": "Eşme" },
          { "id": 853, "name": "Karahallı" },
          { "id": 848, "name": "Merkez" },
          { "id": 851, "name": "Sivaslı" },
          { "id": 852, "name": "Ulubey" }
        ]
      },
      {
        "id": 65,
        "name": "Van",
        "district": [
          { "id": 866, "name": "Bahçesaray" },
          { "id": 860, "name": "Başkale" },
          { "id": 859, "name": "Çaldıran" },
          { "id": 865, "name": "Çatak" },
          { "id": 857, "name": "Edremit" },
          { "id": 855, "name": "Erciş" },
          { "id": 863, "name": "Gevaş" },
          { "id": 862, "name": "Gürpınar" },
          { "id": 854, "name": "İpekyolu" },
          { "id": 861, "name": "Muradiye" },
          { "id": 858, "name": "Özalp" },
          { "id": 864, "name": "Saray" },
          { "id": 856, "name": "Tuşba" }
        ]
      },
      {
        "id": 77,
        "name": "Yalova",
        "district": [
          { "id": 945, "name": "Altınova" },
          { "id": 946, "name": "Armutlu" },
          { "id": 943, "name": "Çiftlikköy" },
          { "id": 944, "name": "Çınarcık" },
          { "id": 942, "name": "Merkez" },
          { "id": 947, "name": "Termal" }
        ]
      },
      {
        "id": 66,
        "name": "Yozgat",
        "district": [
          { "id": 869, "name": "Akdağmadeni" },
          { "id": 878, "name": "Aydıncık" },
          { "id": 871, "name": "Boğazlıyan" },
          { "id": 880, "name": "Çandır" },
          { "id": 876, "name": "Çayıralan" },
          { "id": 873, "name": "Çekerek" },
          { "id": 877, "name": "Kadışehri" },
          { "id": 867, "name": "Merkez" },
          { "id": 875, "name": "Saraykent" },
          { "id": 872, "name": "Sarıkaya" },
          { "id": 874, "name": "Şefaatli" },
          { "id": 868, "name": "Sorgun" },
          { "id": 879, "name": "Yenifakılı" },
          { "id": 870, "name": "Yerköy" }
        ]
      },
      {
        "id": 67,
        "name": "Zonguldak",
        "district": [
          { "id": 886, "name": "Alaplı" },
          { "id": 883, "name": "Çaycuma" },
          { "id": 884, "name": "Devrek" },
          { "id": 881, "name": "Ereğli" },
          { "id": 888, "name": "Gökçebey" },
          { "id": 887, "name": "Kilimli" },
          { "id": 885, "name": "Kozlu" },
          { "id": 882, "name": "Merkez" }
        ]
      }
    ]
  }),

  actions: {
    showModal(payload) {
      this.confirmModal = { ...this.confirmModal, ...payload, show: true }
    }
  }
})
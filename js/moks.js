// Файл moks.js
'use strict';
(function () {
  var ParametrsOfMocks = {
    COUNT: 8,
    TITLE: 'Уютное гнездышко для молодоженов ',
    CHECKIN_CHECKOUT: [
      '12:00',
      '13:00',
      '14:00'
    ],
    ROOMS: {
      min: 1,
      max: 4
    },
    GUESTS: {
      min: 1,
      max: 4
    },
    PRICE: {
      min: 1000,
      max: 30000
    },
    PHOTOS: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ]
  };

  var ParametrOfPins = {
    MAP_WIDTH: 980,
    MAP_HEIGTH: 704,
    PIN_WIDTH: 50,
    PIN_HEIGTH: 70
  };

  /**
   * функция генерации массива объектов, содержащих информацию объявления
   * @param {number} count - количество объявлений
   * @return {array}  - массив объектов, содержащих информацию объявления
   */
  var generateOfferAds = function (count) {
    var offerAd = [];
    for (var i = 0; i < count; i++) {
      var locationX = window.data.getRandomNumber(ParametrOfPins.PIN_WIDTH / 2, ParametrOfPins.MAP_WIDTH - ParametrOfPins.PIN_WIDTH / 2);
      var locationY = window.data.getRandomNumber(ParametrOfPins.PIN_HEIGTH, ParametrOfPins.MAP_HEIGTH - ParametrOfPins.PIN_HEIGTH * 2);
      offerAd[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png',
        },
        'offer': {
          'title': ParametrsOfMocks.TITLE + window.data.getRandomNumber(1, count),
          'address': locationX + ', ' + locationY,
          'price': window.data.getRandomNumber(ParametrsOfMocks.PRICE.min, ParametrsOfMocks.PRICE.max),
          'type': window.data.getRandomElementFromArray(Object.keys(window.data.type)),
          'rooms': window.data.getRandomNumber(ParametrsOfMocks.ROOMS.min, ParametrsOfMocks.ROOMS.max),
          'guests': window.data.getRandomNumber(ParametrsOfMocks.GUESTS.min, ParametrsOfMocks.GUESTS.max),
          'checkin': window.data.getRandomElementFromArray(ParametrsOfMocks.CHECKIN_CHECKOUT),
          'checkout': window.data.getRandomElementFromArray(ParametrsOfMocks.CHECKIN_CHECKOUT),
          'features': window.data.generateArrayWithRandomLength(window.data.features),
          'description': 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована',
          'photos': window.data.generateArrayWithRandomLength(ParametrsOfMocks.PHOTOS)
        },
        'location': {
          'x': locationX,
          'y': locationY
        }
      };
    }
    return offerAd;
  };

  var ads = generateOfferAds(ParametrsOfMocks.COUNT);


  window.moks = {
    ads: ads,
  };
})();

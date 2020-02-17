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


  /**
   * функция генерации случайных чисел
   * @param {number} min - минимальное значение
   * @param {number} max - максимальное значение
   * @return {number} случайное число из диапазона
   */
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * max) + min;
  };

  /**
   * функция возвращает случайный элемент из массива без повторений
   * @param {Array} array - массив
   * @return {*}  - рандомный элемент из массива
   */
  var getRandomUniqueElementFromArray = function (array) {
    var randomUniqueElement = array[getRandomNumber(0, array.length - 1)];
    array.splice(array.indexOf(randomUniqueElement, 0), 1);
    return randomUniqueElement;
  };

  /**
   * функция возвращает случайный элемент из массива
   * @param {Array} array - массив
   * @return {*}  - рандомный элемент из массива
   */
  var getRandomElementFromArray = function (array) {
    var randomElement = array[getRandomNumber(0, array.length)];
    return randomElement;
  };

  /**
   * функция создает массив случайных элементов случайной длинны
   * @param {Array} originalArray - массив
   * @return {Array}  - массив случайных элементов случайной длинны
   */
  var generateArrayWithRandomLength = function (originalArray) {
    var oldArray = originalArray.slice();
    var newArray = [];
    var length = getRandomNumber(1, oldArray.length);

    for (var i = 0; i < length; i++) {
      newArray[i] = getRandomUniqueElementFromArray(oldArray);
    }
    return newArray;
  };

  /**
   * функция генерации массива объектов, содержащих информацию объявления
   * @param {number} count - количество объявлений
   * @return {array}  - массив объектов, содержащих информацию объявления
   */
  var generateOfferAds = function (count) {
    var offerAd = [];
    for (var i = 0; i < count; i++) {
      var locationX = getRandomNumber(window.data.parametrOfPins.PIN_WIDTH / 2, window.data.parametrOfPins.MAP_WIDTH - window.data.parametrOfPins.PIN_WIDTH / 2);
      var locationY = getRandomNumber(window.data.parametrOfPins.PIN_HEIGTH, window.data.parametrOfPins.MAP_HEIGTH - window.data.parametrOfPins.PIN_HEIGTH * 2);
      offerAd[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png',
        },
        'offer': {
          'title': ParametrsOfMocks.TITLE + getRandomNumber(1, count),
          'address': locationX + ', ' + locationY,
          'price': getRandomNumber(ParametrsOfMocks.PRICE.min, ParametrsOfMocks.PRICE.max),
          'type': getRandomElementFromArray(Object.keys(window.data.type)),
          'rooms': getRandomNumber(ParametrsOfMocks.ROOMS.min, ParametrsOfMocks.ROOMS.max),
          'guests': getRandomNumber(ParametrsOfMocks.GUESTS.min, ParametrsOfMocks.GUESTS.max),
          'checkin': getRandomElementFromArray(ParametrsOfMocks.CHECKIN_CHECKOUT),
          'checkout': getRandomElementFromArray(ParametrsOfMocks.CHECKIN_CHECKOUT),
          'features': generateArrayWithRandomLength(window.data.features),
          'description': 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована',
          'photos': generateArrayWithRandomLength(ParametrsOfMocks.PHOTOS)
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

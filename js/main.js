'use strict';
var ParametrOfPins = {
  COUNT: 8,
  MAP_WIDTH: 980,
  MAP_HEIGTH: 704,
  PIN_WIDTH: 50,
  PIN_HEIGTH: 70,
  TITLE: 'Уютное гнездышко для молодоженов ',
  TYPE: {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  },
  CHECKIN: [
    '12:00',
    '13:00',
    '14:00'
  ],
  CHECKOUT: [
    '12:00',
    '13:00',
    '14:00'
  ],
  FEATURES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ],
  PARAMETRS_OF_PHOTOS: {
    WIDTH: 45,
    HEIGHT: 40
  },
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
  }
};

var numberImg = [1, 2, 3, 4, 5, 6, 7, 8];

/**
 * функция генерации случайных чисел (параметры мин и мах)
 * @param {number} min - минимальное значение
 * @param {number} max - максимальное значение
 * @return {number} случайное число из диапазона
 */
var getRandom = function (min, max) {
  return Math.floor(Math.random() * max) + min;
};

/**
 * функция возвращает случайное значение из массива, удаляя это значение из массива
 * @param {array} arr - массив из которого нужно генерировать рандомные значения
 * @return {number} newNumber - рандомный значение из массива
 */
var getRandomNumberArr = function (arr) {
  var newNumber = arr[getRandom(0, arr.length - 1)];
  arr.splice(arr.indexOf(newNumber, 0), 1);
  return newNumber;
};

/**
 * функция генерации массива случайной длинны, с данными из входящего массива
 * @param {number} maxLength - максимальная длинна массива
 * @param {array} arr - входящий массив из которого нужно генерировать рандомные значения
 * @return {array} array - массив случайной длинны, с данными из входящего массива
 */
var getRandomArrWhithRandomLength = function (maxLength, arr) {
  var array = [];
  var length = getRandom(1, maxLength);
  for (var i = 0; i < length; i++) {
    var newNumber = arr[getRandom(0, arr.length - 1)];
    array.push(newNumber);
    for (var j = 0; j < length; j++) {
      var item = arr[j];
      if (array.indexOf(item) === -1) {
        array.push(item);
      }
    }
    return array;
  }
};


/**
 * функция генерации значения случайного ключа объкта
 * @param {object} obj - объект
 * @return {*}  - значение случайного ключа объкта
 */
var getRandomKeyObj = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[getRandom(0, keys.length)]];
};

/**
 * функция генерации массива объектов, содержащих информацию объявления
 * @param {number} COUNT - количество объявлений
 * @return {array} offerAd - массив объектов, содержащих информацию объявления
 */
var generateOfferAds = function (COUNT) {
  var offerAd = [];
  for (var i = 0; i < COUNT; i++) {
    offerAd[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + getRandomNumberArr(numberImg) + '.png',
      },
      'offer': {
        'title': ParametrOfPins.TITLE + getRandom(1, ParametrOfPins.COUNT),
        'address': '600, 350',
        'price': getRandom(ParametrOfPins.PRICE.min, ParametrOfPins.PRICE.max),
        'type': getRandomKeyObj(ParametrOfPins.TYPE),
        'rooms': getRandom(ParametrOfPins.ROOMS.min, ParametrOfPins.ROOMS.max),
        'guests': getRandom(ParametrOfPins.GUESTS.min, ParametrOfPins.GUESTS.max),
        'checkin': ParametrOfPins.CHECKIN[getRandom(0, ParametrOfPins.CHECKIN.length)],
        'checkout': ParametrOfPins.CHECKOUT[getRandom(0, ParametrOfPins.CHECKOUT.length)],
        'features': getRandomArrWhithRandomLength(ParametrOfPins.FEATURES.length, ParametrOfPins.FEATURES),
        'description': 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована',
        'photos': getRandomArrWhithRandomLength(ParametrOfPins.PHOTOS.length, ParametrOfPins.PHOTOS)
      },
      'location': {
        'x': getRandom(ParametrOfPins.PIN_WIDTH / 2, ParametrOfPins.MAP_WIDTH - ParametrOfPins.PIN_WIDTH / 2), // от половины ширины метки до ширины экрана минус половина ширины метки
        'y': getRandom(ParametrOfPins.PIN_HEIGTH, ParametrOfPins.MAP_HEIGTH - ParametrOfPins.PIN_HEIGTH * 2) // от половины ширины метки до ширины экрана минус половина ширины метки
      }
    };
  }
  return offerAd;
};

var mapDialog = document.querySelector('.map');
mapDialog.classList.remove('map--faded');
var mapPins = document.querySelector('.map__pins');

/**
 * функция клонирования шаблона и заполнения его данными: заголовок, ссылка на аватар, местоположение на карте
 * @param {array} arr - массив объектов объявлений
 * @return {*} pinElement - шаблон заполненный данными
 */

var renderPin = function (arr) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + arr.location.x + 'px; top: ' + arr.location.y + 'px;';
  pinElement.querySelector('img').src = arr.author.avatar;
  pinElement.querySelector('img').alt = arr.offer.title;
  return pinElement;
};

/**
 * функция добавления меток на карту
 * @param {array} pins - массив объектов объявлений
 */
var addPins = function (pins) {
  var mapPinsFragment = document.createDocumentFragment();
  pins.forEach(function (item, i) {
    mapPinsFragment.appendChild(renderPin(pins[i]));
  });
  mapPins.appendChild(mapPinsFragment);
};

/**
 * функция генерации карточки объявления
 * @param {array} card - массив объектов объявлений
 */
var renderCard = function (card) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  var textRooms = card.offer.rooms + ' комнаты для ';
  var textGuests = card.offer.guests + ' гостей';
  if (card.offer.guests === 1) {
    textGuests = card.offer.guests + ' гостя';
  }
  if (card.offer.rooms === 1) {
    textRooms = card.offer.rooms + ' комната для ';
  }
  cardElement.querySelector('.popup__text--capacity').textContent = textRooms + textGuests;
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  var features = cardElement.querySelector('.popup__features');
  var feature = features.querySelector('.popup__feature');


  card.offer.features.forEach(function (elem, i) {
    var newFeature = feature.cloneNode(true);
    newFeature.classList.add('popup__feature--' + card.offer.features[i]);
    features.appendChild(newFeature);
  });

  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  var cardImg = cardElement.querySelector('.popup__photos');
  var photo = cardImg.querySelector('.popup__photo');

  card.offer.photos.forEach(function (elem, i) {
    var newImg = photo.cloneNode(true);
    newImg.src = card.offer.photos[i];
    cardImg.appendChild(newImg);
  });

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  mapDialog.insertBefore(cardElement, document.querySelector('.map__filters-container'));
};

var ads = generateOfferAds(ParametrOfPins.COUNT);
addPins(ads);

renderCard(ads[0]);

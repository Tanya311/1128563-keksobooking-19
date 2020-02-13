'use strict';
var ENTER_KEY = 'Enter';
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

var TYPE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var ROOMS_FORMS = [
  'комната',
  'комнаты',
  'комнат',
];

var GUESTS_FORMS = [
  'гостя',
  'гостей',
  'гостей',
];

/**
 * функция создания правильных окончаний
 * @param {Array<String>} forms
 * @param {Number} n
 * @return {String}
 */

var getPluralForm = function (forms, n) {
  var idx;
  if (n % 10 === 1 && n % 100 !== 11) {
    idx = 0; // many
  } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
    idx = 1; // few
  } else {
    idx = 2; // one
  }
  return forms[idx] || '';
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
  var newArray = [];
  var length = getRandomNumber(1, originalArray.length);

  for (var i = 0; i < length; i++) {
    newArray[i] = getRandomUniqueElementFromArray(originalArray);
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
    var locationX = getRandomNumber(ParametrOfPins.PIN_WIDTH / 2, ParametrOfPins.MAP_WIDTH - ParametrOfPins.PIN_WIDTH / 2);
    var locationY = getRandomNumber(ParametrOfPins.PIN_HEIGTH, ParametrOfPins.MAP_HEIGTH - ParametrOfPins.PIN_HEIGTH * 2);
    offerAd[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },
      'offer': {
        'title': ParametrsOfMocks.TITLE + getRandomNumber(1, count),
        'address': locationX + ', ' + locationY,
        'price': getRandomNumber(ParametrsOfMocks.PRICE.min, ParametrsOfMocks.PRICE.max),
        'type': getRandomElementFromArray(Object.keys(TYPE)),
        'rooms': getRandomNumber(ParametrsOfMocks.ROOMS.min, ParametrsOfMocks.ROOMS.max),
        'guests': getRandomNumber(ParametrsOfMocks.GUESTS.min, ParametrsOfMocks.GUESTS.max),
        'checkin': getRandomElementFromArray(ParametrsOfMocks.CHECKIN_CHECKOUT),
        'checkout': getRandomElementFromArray(ParametrsOfMocks.CHECKIN_CHECKOUT),
        'features': generateArrayWithRandomLength(FEATURES),
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

// mapDialog.classList.remove('map--faded');

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapFiltersContainer = document.querySelector('.map__filters-container');

/**
 * функция клонирования шаблона и заполнения его данными: заголовок, ссылка на аватар, местоположение на карте
 * @param {Object} pinDate - объект объявлений
 * @return {*}  - шаблон заполненный данными
 */

var renderPin = function (pinDate) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);
  var imgElement = pinElement.querySelector('img');
  pinElement.style = 'left: ' + pinDate.location.x + 'px; top: ' + pinDate.location.y + 'px;';
  imgElement.src = pinDate.author.avatar;
  imgElement.alt = pinDate.offer.title;
  return pinElement;
};

var mapPinsFragment = document.createDocumentFragment();
ads.forEach(function (pin) {
  mapPinsFragment.appendChild(renderPin(pin));
});


var mapDialog = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');
var mapFiltersFormSelect = mapDialog.querySelectorAll('.map__filters select');
var mapFiltersFormFieldsets = mapDialog.querySelectorAll('.map__filters fieldset');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var adressAdForm = adForm.querySelector('#address');
var roomNumber = adForm.querySelector('#room_number');
var guestsCout = adForm.querySelector('#capacity');

mapFiltersFormSelect.forEach(function (select) {
  select.setAttribute('disabled', 'disabled');
});
mapFiltersFormFieldsets.forEach(function (fieldset) {
  fieldset.setAttribute('disabled', 'disabled');
});
adFormFieldsets.forEach(function (fieldset) {
  fieldset.setAttribute('disabled', 'disabled');
});
adressAdForm.setAttribute('readonly', 'readonly');
adressAdForm.value = (ParametrOfPins.PIN_WIDTH / 2, ParametrOfPins.MAP_WIDTH - ParametrOfPins.PIN_WIDTH / 2) + ' , ' + (ParametrOfPins.PIN_HEIGTH, ParametrOfPins.MAP_HEIGTH - ParametrOfPins.PIN_HEIGTH * 2);


var mapDialogOpenHandler = function () {
  mapPins.appendChild(mapPinsFragment);
  mapDialog.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach(function (formFieldset) {
    formFieldset.removeAttribute('disabled');
  });
  mapFiltersFormSelect.forEach(function (filterSelect) {
    filterSelect.removeAttribute('disabled');
  });
  mapFiltersFormFieldsets.forEach(function (filterFieldset) {
    filterFieldset.removeAttribute('disabled');
  });
};

var roomCapacityValidateHandler = function () {
  if (roomNumber.value === '1') {
    guestsCout[0].setAttribute('disabled', 'disabled');
    guestsCout[1].setAttribute('disabled', 'disabled');
    guestsCout[3].setAttribute('disabled', 'disabled');
  } else if (roomNumber.value === '2') {
    guestsCout[1].removeAttribute('disabled');
  } else if (roomNumber.value === '3') {
    guestsCout[0].removeAttribute('disabled');
  } else if (roomNumber.value === '100') {
    guestsCout[0].setAttribute('disabled', 'disabled');
    guestsCout[1].setAttribute('disabled', 'disabled');
    guestsCout[2].setAttribute('disabled', 'disabled');
    guestsCout[3].removeAttribute('disabled');
  }
};

roomCapacityValidateHandler();
adForm.addEventListener('change', roomCapacityValidateHandler);

mapPins.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    mapDialogOpenHandler();
  }
});
mapPins.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    mapDialogOpenHandler();
  }
});


/**
 * функция генерации карточки объявления
 * @param {Object} card - объект объявлений
 */

var renderCard = function (card) {

  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPE[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + getPluralForm(ROOMS_FORMS, card.offer.rooms) + ' для ' + card.offer.guests + ' ' + getPluralForm(GUESTS_FORMS, card.offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  var features = cardElement.querySelector('.popup__features');
  var feature = features.querySelector('.popup__feature');
  var featureFragment = document.createDocumentFragment();
  features.innerHTML = '';
  feature.classList.remove('popup__feature--wifi');

  card.offer.features.forEach(function (featureItom) {
    var newFeature = feature.cloneNode(true);
    newFeature.classList.add('popup__feature--' + featureItom);
    featureFragment.appendChild(newFeature);
  });

  features.appendChild(featureFragment);

  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  var cardImg = cardElement.querySelector('.popup__photos');
  var imgFragment = document.createDocumentFragment();
  var photo = cardImg.querySelector('.popup__photo');
  cardImg.innerHTML = '';

  card.offer.photos.forEach(function (photoItom) {
    var newImg = photo.cloneNode(true);
    newImg.src = photoItom;
    imgFragment.appendChild(newImg);
  });
  cardImg.appendChild(imgFragment);

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  mapDialog.insertBefore(cardElement, mapFiltersContainer);
};


renderCard(ads[0]);

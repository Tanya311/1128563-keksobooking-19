'use strict';

var mapDialog = document.querySelector('.map');
mapDialog.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var mapPinsFragment = document.createDocumentFragment();
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


/**
 * функция генерации случайных чисел (параметры мин и мах)
 * @param {number} min - минимальное значение
 * @param {number} max - максимальное значение
 * @return {number} случайное число из диапазона
 */
var getRandom = function (min, max) {
  return Math.floor(Math.random() * max) + min;
};
var COUNT = 8;
var avatar = 'img/avatars/user0';
var TITLE = 'Заголовок 0';
var MAP_WIDTH = 980;
var MAP_HEIGTH = 704;
var PIN_WIDTH = 50;
var PIN_HEIGTH = 70;
var numberImg = [1, 2, 3, 4, 5, 6, 7, 8];

/**
 * функция генерации рандомных номеров без повторений
 * @param {array} arr - массив из которого нужно генерировать рандомные значения
 * @return {number} newNumber - рандомный значение из массива
 */
var getRandomNumberArr = function (arr) {
  var newNumber = arr[getRandom(0, arr.length - 1)];
  arr.splice(arr.indexOf(newNumber, 0), 1);
  return newNumber;
};

/**
 * функция генерации объекта аватаров автора со случайным адресом ссылки
 * @param {number}  - рандомный номер, сгенерированный функцией getRandomNumberArr()
 * @param {stroke} avatar - начало ссылки на изображение
 * @return {object} author - объект с ссылкой на аватар
 */
var getAuthor = function () {
  var author = {};
  author.avatar = avatar + getRandomNumberArr(numberImg) + '.png';
  return author;
};

/**
 * функция генерации заголовков
 * @param {number} count - колличество
 * @param {stroke} TITLE - начало ссылки на изображение
 * @return {stroke} title - переменная, содержащая случайную строку заголовка
 */
var getTitle = function () {
  var title = TITLE + getRandom(1, COUNT);
  return title;
};

/**
 * функция генерации координаты метки на карте
 * @param {number} mapWidth - Ширина карты
 * @param {number} mapHeigth - Высота карты
 * @param {number} pinWidth - Ширина метки
 * @param {number} pinHeigth - Высота метки
 * @return {object} location - объект с координатами метки
 */
var getLocation = function (mapWidth, mapHeigth, pinWidth, pinHeigth) {
  var x = getRandom(pinWidth / 2, mapWidth - pinWidth / 2); // от половины ширины метки до ширины экрана минус половина ширины метки
  var y = getRandom(pinHeigth, mapHeigth - pinHeigth * 2); // от высоты метки до высоты экрана минус двойная высота метки
  var location = {
    x: x,
    y: y
  };
  return location;
};

/**
 * функция клонирования шаблона и заполнения его данными: заголовок, ссылка на аватар, местоположение на карте
 * @param {object} location - объект случайных координат созданный функцией getLocation()
 * @param {*} avatarUrl - объект автора с аватаром созданный функцией getAuthor()
 * @param {srting} title - название заголовка созданное фкнкцией getTitle()
 * @return {*} pinElement - шаблон заполненный данными
 */
var renderPin = function (location, avatarUrl, title) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + location.x + 'px; top: ' + location.y + 'px;';
  pinElement.querySelector('img').src = avatarUrl.avatar;
  pinElement.querySelector('img').alt = title;
  return pinElement;
};

for (var i = 0; i < COUNT; i++) {
  var pin = renderPin(getLocation(MAP_WIDTH, MAP_HEIGTH, PIN_WIDTH, PIN_HEIGTH), getAuthor(), getTitle());
  mapPinsFragment.appendChild(pin);
}

mapPins.appendChild(mapPinsFragment);
